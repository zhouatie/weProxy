"use strict";

var koa = require('koa');
var http = require('http');
var https = require('https');
var fs = require('fs');
var enforceHttps = require('koa-sslify').default;
var path = require('path')
var app = new koa();

// Force HTTPS on all page
app.use(enforceHttps());

// index page
app.use(function * (next) {
    this.body = "hello world from " + this.request.url;
});

// SSL options
var options = {
  key: fs.readFileSync(path.resolve(__dirname, '../config/private.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../config/public.crt'))
};

// start the server
http.createServer(app.callback()).listen(80);
https.createServer(options, app.callback()).listen(443);

//
console.log('https server is running');