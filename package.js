/* eslint-env meteor */
Package.describe({
  name: 'leaonline:status',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Package to automatically send health data to the status server.',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:leaonline/status.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use('ecmascript', 'server')
  api.mainModule('status.js', 'server')
})
