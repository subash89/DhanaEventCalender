var google = require('googleapis');
var googleAuth = require('google-auth-library');
var oauth=require('../oauth/google_oauth_provider');
var fs = require('fs');
var config=require('../../../config');

module.exports.getEvents =function() {
    return new Promise(function(resolve,reject){
        var calendar = google.calendar('v3');
        calendar.events.list({
          auth: oauth.jwt,
          calendarId: config.calender_id,
          timeMin: (new Date()).toISOString(),
          maxResults: 1,
          singleEvents: true,
          orderBy: 'startTime'
        }, function(err, response) {
          if (err) {
            console.log('The API returned an error: ' + err);
            reject(err);        
            return;
          }
          var events = response.items;
          if (events.length == 0) {
            console.log('No upcoming events found.');
          } else {
            console.log('Upcoming 10 events:');
    
            var eventList=[];
             for (var i = 0; i < events.length; i++) {
              var event = events[i];
              console.log("=======");
              console.log(event);
              console.log("=======");
              
              var startd = event.start.dateTime || event.start.date;
              var item={
                  id:event.id,
                  start: startd,
                  eventSummary:event.summary,
                  description:event.description
              };
              eventList.push(item);
              event.description='test 22 from api';
              updateEvent(event);

              console.log('%s - %s - %s', startd, event.summary,event.description);
            }
            resolve(eventList);
           // data.send(eventList);
    
          }
        });
    });

};

function updateEvent(event){
  oauth.jwt.authorize(function(err,token){
    console.log("========");
    
    console.log(token);
    console.log("========");
    
    var calendar = google.calendar('v3');
    calendar.events.update({
      auth: oauth.jwt,
      calendarId:config.calender_id,
      eventId:event.id,
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('The API returned an error when updating: ' + err);
        return;
      }
    });
  });

}

module.exports.addEvent=function(event){


    console.log("in api");
    console.log(event);
    return new Promise(function(resolve,reject){
      oauth.jwt.authorize(function(err,token){
        console.log("========");
        
        console.log(token);
        console.log("========");
        
        var calendar = google.calendar('v3');
        calendar.events.insert({
          auth: oauth.jwt,
          calendarId: config.calender_id,
          resource: event,
        }, function(err, event) {
          if (err) {
            console.log('The API returned an error: ' + err);
            reject(err);        
            return;
          }
          resolve(event);
        });
      });

    });

}

module.exports.updateEvent=function(event){
    

}



