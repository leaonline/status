import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { HTTP } from 'meteor/jkuester:http'
import os from 'os'
import { createHmac } from 'crypto'

check(Meteor.settings.status, Match.ObjectIncluding({
  active: Boolean,
  interval: Number,
  url: String,
  secret: String
}))

const { active, interval, url, secret, quietAfter = 5 } = Meteor.settings.status

if (active) {
  Meteor.startup(() => {
    let origin = Meteor.absoluteUrl()

    if (origin.charAt(origin.length - 1) === '/') {
      origin = origin.substring(0, origin.length - 1)
    }

    const hash = createHmac('sha256', secret)
      .update(origin, 'utf8')
      .digest('hex')

    const headers = { origin }

    let fails = 0

    Meteor.setInterval(() => {
      const subs = {}
      let sessions = 0

      const osuptime = os.uptime()
      const osload = os.loadavg()
      const osfreemem = os.freemem() / 1000000 // mb
      const ostotalmem = os.totalmem() / 1000000

      Meteor.server.sessions.forEach(session => {
        sessions++
        session._namedSubs.forEach(sub => {
          const name = sub._name.replace(/\./g, '_')
          subs[name] = subs[name] || 0
          subs[name]++
        })
      })

      const data = {
        sessions,
        origin,
        subs,
        osuptime,
        osload,
        osfreemem,
        ostotalmem,
        hash
      }

      HTTP.post(url, { headers, data }, (err, res) => {
        if (err) {
          if (fails++ < quietAfter) {
            console.error('[health-status]: ', err.message)
          }

          return
        }

        const code = res?.statusCode
        if (code !== 200 && fails++ <= quietAfter) {
          console.error('[health-status]: ', res?.statusCode)
          console.error('[health-status]: ', res?.content)
        }

        if (code === 200 && fails > 0) {
          console.debug('[health-status]: connection restored')
          fails = 0
        }
      })
    }, interval)
  })
}
