const http = require('http')
const httpProxy = require('http-proxy')
const fs = require('fs')
const path = require('path')
const proxy = httpProxy.createProxyServer({
  ssl: {
    key: fs.readFileSync(path.resolve(__dirname, '../config/private.pem'), 'utf8'),
    cert: fs.readFileSync(path.resolve(__dirname, '../config/public.crt'), 'utf8')
  },
  target: {
    host: '127.0.0.1',
    port: 9000
  }
});

http.createServer({
  key: fs.readFileSync(path.resolve(__dirname, '../config/private.pem'), 'utf8'),
  cert: fs.readFileSync(path.resolve(__dirname, '../config/public.crt'), 'utf8')
}, async (res, req) => {
  console.log(req, 'reqqq')
  proxy.web(res, req);
}).listen(8000)

proxy.on('error', (err, req, res) => {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});