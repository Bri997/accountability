const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const _ = require('lodash')
const config = require('config')

const app = express();
mongoose.Promise = global.Promise;

app.use(jsonParser)

const { PORT, DATABASE_URL } = require('./config');

app.use(express.static('public'));

const taskRouter = require('./taskRouter')
app.use('/task', taskRouter)

const timeSessions = require('./timeSessionRouter')
app.use('/timesession', timeSessions)

const users = require('./routes/users')
app.use('/api/users', users)

const auth = require('./routes/auth');
app.use('/api/auth', auth)

if (!config.get('jwtPrivateKey')){
  console.error('Fatal Error: JWT Token not defined ')
  process.exit(1)
}



let server;


function runServer(databaseUrl, port = PORT) {

    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      });
    });
  }
  
  // this function closes the server, and returns a promise. we'll
  // use it in our integration tests later.
  function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  
  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
  if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  }
  
  module.exports = { app, runServer, closeServer };
  