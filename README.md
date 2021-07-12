# leaonline:status

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
