const http = require('http');
const net = require('net');
const url = require('url');

function request(cReq, cRes) {
  const u = url.parse(cReq.url);

  const options = {
    hostname: u.hostname,
    port: u.port || 80,
    path: u.path,
    method: cReq.method,
    headers: cReq.headers
  };
  console.log(options, 'options')
  const pReq = http.request(options, function (pRes) {
    cRes.writeHead(pRes.statusCode, pRes.headers);
    pRes.pipe(cRes);
  }).on('error', function (e) {
    console.log(e, 'eee')
    cRes.end();
  });

  cReq.pipe(pReq);
}

function connect(cReq, cSock) {
  const u = url.parse('http://' + cReq.url);

  const pSock = net.connect(u.port, u.hostname, function () {
    cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    pSock.pipe(cSock);
  }).on('error', function (e) {
    console.log(e, 'eeeeee')
    cSock.end();
  });

  cSock.pipe(pSock);
}

http.createServer()
  .on('request', request)
  .on('connect', connect)
  .listen(8000, '0.0.0.0');