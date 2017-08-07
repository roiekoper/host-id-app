var http = require('http');
var app = require('express')();
var fs = require('fs');
var os = require('os');
var html = ''

fs.readFile('index.html', 'utf8', function (err,data) {
  if (err) {
    html = err;
  }
  else {
    html = data;
 }
})
app.get('/', function (req, res) {

    var result;
    console.log('yay i was called at',new Date().toISOString());
    result = html.replace(/{{podName}}/g, os.hostname())
    fs.writeFileSync('rendered.html', result)
    res.set('Content-Type', 'text/html');
    res.sendFile('rendered.html',  { root: __dirname })
  });

console.log('host-id running. Listening on port 3000');
app.listen(3000, '0.0.0.0');
