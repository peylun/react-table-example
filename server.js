const express = require('express');
const http = require('http');
const path = require('path');
const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 4000);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', routes.data);
app.get('/dataSize', routes.dataSize);

const port = app.get('port');
this.server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = app;
