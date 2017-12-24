
var google = require('googleapis');
var fs = require('fs');

var googleAuth = require('google-auth-library');
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
var key=###Enter Your Key HERE###


  var jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES, // an array of auth scopes
    null
  );
module.exports.jwt=jwtClient;

