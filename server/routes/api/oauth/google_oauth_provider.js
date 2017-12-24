
var google = require('googleapis');
var fs = require('fs');

var googleAuth = require('google-auth-library');
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
var key={
    "type": "service_account",
    "project_id": "eventcalendar-182113",
    "private_key_id": "77b79fc354101dd516dd77e36ab8980a55ae67bd",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCt8b0JgmlCq/U/\ntp0N0evcSPUz8uFKGoBDsJQZXf1NNN8kJTQyATHYv20uN9mY/jKJ8xmYe8Q75Z5G\nWAoiREkvaPl/zVU2i/4R1TiVIDZarybcrgVBpwGYVW0QaBam7HPqQzNlVAdSQYk5\nFFVqDkpGabk4yL9T2/YnHwTfUKc3XHSQp8z/C7cRCc5fOPcOcBP7VmfsmMiRUdg3\nvx8c50FvsjdKifZQab/T6QbBN7J3J860Esd0kKDYoLmfm6DrF79xuOt1nyMP38aP\nd8GQ4CdE8TAdTHA9PWyyF5xhaqJ0dlgya6XNXgGn7aJrj9EhCz/006CWgvxTAo3D\nFymSo5WbAgMBAAECggEAUAKlmxWvGFljtppntJ8uWEYA8BPU+FKnVDuJa/+1T4m1\n6HjqgOPWy2YGMR/EiiDHG3hEekTX91tACgheJPP3HAUz2ssW2r/bLtW+sK3AAseV\nXyX2ygOpcqo8wDK41LBoA0ZFAmN7+KSnm6dUQLPxC2F/LvT8OPUxTT5x7cy6Ffa/\n0dBgB/hd0jn8CYe8vB+U3KPixsALALII012bDamYPV8YWB6SXXvf6ace9Y0J2Vhq\nPMJbEht+cETUy2AH5020OIseKA+JqEL8hYaM7WkUXl3HxiHf391sKesjZRVu0U+w\nruJErppBAn4etH2HDPuOCKL5eW+ylpAQn8U4QvWYQQKBgQDxPdzTJFFUQYNdzd8a\nHgG6xWM72ZKZen/cymy653xW3ov7c6aUKmu1mFx1JsuTV1xBQNG4eFJSL/8xp28r\ncF7a2KB7gSWVRFRxbbMdZ7KB/deqCwKgXn7fWfFSfzRDalhlPwJGZ9EKKdFfloy2\nOfomBDsisdwE+EmuApCUtQQaWwKBgQC4leraQryLdR+oMx/EGdCZNtOkO5e5dUlc\nPQTjeD23uHX9etEsD7t9/SPYzvNWsHX5+nYHnUz23Vs+zs4/uKRNtRzHhBekTzn8\n9TWPzR+VoaRGlKVQl45wi2jraS8MMCUOl5YhQ9ZeIGlEI5EW1J3hNwRIGbWtvO2k\nhDhVqDrVwQKBgQDsPTpsgdoq+mTcjWh3OP9UmUuOJohLSAzCeHB1r46xuwm12hE8\nczY7BNM13iHpTdmIBSPa0+k5lsr/IwnYrhgVk6HEkDnvrJRM57JJj2zdo2l4mYOe\n7CquKnQJ54uUoSWjMErYC35Hx5/DTbjKEoiGhgoq9aWSMFpmzxgqqAE2lQKBgG/p\n/X2dzuEi/zGk5ZKpMC9k7Yb61rAMK5FwMaGVCp50iZ1JNL9pPn1R2MUgHKuny6/n\nql5Nghd++E6pZqV91qiCsdNKBGeL3ZXAOlxYutinK4nboCuv6B3WeKOan3rdSeqB\n//VlQvjI3+n/Qn28JYkiKUdpxxxymwcPX3SXzixBAoGABwLjrBM4GP6y5ek9SN1Q\nDinwHDbGdXtlLo8Xd2xkjHuTPbwG5nEp9mlq/lhXTG14ftuRX1/0udTXtMm9l96t\n/e98JenDiViKqRxEzZX1fEBottsFTjSTP41eJ0fFiyl19LTmLsdIEbmv1X4ZQmgj\nrT4YEuXzC1EeCJH1aG5vQLA=\n-----END PRIVATE KEY-----\n",
    "client_email": "event-modifier@eventcalendar-182113.iam.gserviceaccount.com",
    "client_id": "101097608266244374194",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/event-modifier%40eventcalendar-182113.iam.gserviceaccount.com"
  }
  


  var jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES, // an array of auth scopes
    null
  );
module.exports.jwt=jwtClient;

