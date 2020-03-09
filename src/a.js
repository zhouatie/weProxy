const httpProxy = require('http-proxy')
const fs = require('fs')
const path = require('path')

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 9000
  },
  ssl: {
    key: fs.readFileSync(path.resolve(__dirname, '../config/private.pem'), 'utf8'),
    cert: fs.readFileSync(path.resolve(__dirname, '../config/public.crt'), 'utf8')
  },
}).listen(8009);