# leaonline:status

[![built with Meteor](https://img.shields.io/badge/Meteor-Package-green?logo=meteor&logoColor=white)](https://meteor.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
![GitHub](https://img.shields.io/github/license/leaonline/status)

Package to automatically send health data to the
[status server](https://github.com/leaonline/leaonline-status).

## install

```bash
$ meteor add leaonline:status
```

## Usage

To configure the packaghe you need to add a `"status"` entry to your `package.json`
(top-level, not under public):

```json
{
  "active": true,                             // on/off switch
  "interval": 15000,                          // send interval in ms
  "secret": "0123456789abcdefg",              // secret to create hmac
  "url": "http://status.mydomain.tld/collect" // https endpoint
}
```

## License

MIT, see [LICENSE](./LICENSE)
