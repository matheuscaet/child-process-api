const http = require('http');
const {fork} = require('child_process');
const { rmSync } = require('fs');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const compute = fork('./src/api/compute.js');
    const compute2 = fork('./src/api/compute.js');
    compute.send('start');
    compute2.send('start');
    compute.on('message', response => {
      res.end(JSON.stringify(response));
      console.log('Compute: ' + JSON.stringify(response))
    });
    compute2.on('message', response => {
      res.end(JSON.stringify(response));
      console.log('Compute2: ' + JSON.stringify(response))
    });
  } else {
    res.end('Ok')
  }
});

server.listen(3000);