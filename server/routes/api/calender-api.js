var express = require('express');
var router = express.Router();
var calender_proxy = require('./google-api/calender-proxy');
var sesClient=require('./aws/ses-client');
var config= require('../../config');
var userStore=require('./aws/dynamo-client');

var dhanaUserStore=new userStore();
/* GET users listing. */
router.get('/list', function (req, res, next) {

    calender_proxy.getEvents().then(function (data) {
        console.log("promises called");
        res.send(data);
    }).catch(function (err) {
        res.status(500);
    });
});

router.get('/event/by', function (req, res, next) {
    var id = req.query.id; // $_GET["id"]

    calender_proxy.getEventById(id).then(function (data) {
        console.log("promises called");
        res.send(data);
    }).catch(function (err) {
        res.status(500);
    });

});
/* GET users listing. */
router.get('/event', function (req, res, next) {
    var date = req.query.date; // $_GET["id"]

    calender_proxy.getEventsForDate(date).then(function (data) {
        console.log("promises called");
        res.send(data);
    }).catch(function (err) {
        res.status(500);
    });

});


router.get('/request/approve',function(req,res,next){

    var key = req.query.key; // $_GET["id"]

    console.log(key);
    var jsonString=new Buffer(key, 'base64').toString('ascii');
    console.log(jsonString);
    var approvalInfo=JSON.parse(jsonString);

    var email=approvalInfo.email;
    var name=approvalInfo.fullName;
    var date=approvalInfo.date;
    var eventId=approvalInfo.eventId;

    console.log('event id'+eventId);
    calender_proxy.getEventById(eventId).then((event)=>{

        console.log()
        event.summary=name;
        event.description=name;
        calender_proxy.updateEvent(event).then((data)=>{
            sesClient.sendEmail('subashsdm@gmail.com',email,"You dhana was succesully approved","Dhana request Approval");

        })
        .catch((err)=>{
            console.log(err);
            sesClient.sendEmail('subashsdm@gmail.com',email,"You dhana was not approved","Dhana request Approval");

        });

    })
    .catch((err)=>{
        console.log(err);
    })




});

router.post('/request/event', function (req, res, next) {
    var event = req.body;

    var fName=event.firstName;
    var lastName=event.lastName;
    var email=event.email;
    var requestDate=event.date;
    var notes=event.specialNotes;

    

    calender_proxy.getEventsForDate(requestDate).then((events) => {
    
        if (events.length > 0) {

            let event=events[0];
            console.log(events[0]);
            //there is already scheduled event
            let currentOwner=event.summary; // current owner's name is in the summary
            //get current owner email from dynamo
            dhanaUserStore.getUser(currentOwner).then((data)=>{
 
                if(data != null && data.Item != null && data.Item.name != null){
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>|||" + data.Item.name.S); 
                    var currentOwnerEmail=data.Item.email.S;
                    var requestChange={}
                    requestChange.fullName=fName+' '+lastName;
                    requestChange.email=email;
                    requestChange.eventId=event.id;
                    var encodedString=new Buffer(JSON.stringify(requestChange)).toString('base64');
        
                    let content=getEmailTemplate(fName+' '+lastName,currentOwner,requestDate,encodedString);
        
        
                    //sending email to current owner asking for approval
                    sesClient.sendEmail(config.email.sender,currentOwnerEmail,content,'Request for Dhana')
                    .then((data)=>{
                        console.log(data);
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                    res.status(200);
                    res.send(events[0]);
               } else {
                   console.log("No such user exists");
               }
 


            }).catch((err)=>{
                console.log(err);
            })

        } else {
            calender_proxy.addEvent(event).then(function (data) {
                console.log("promises called");
                res.send(data);
            }).catch(function (err) {
                res.status(500);
            });
        }
    })


});

router.put('/event', function (req, res, next) {
    var event = req.body.googleCalenderEvent;
    var metaData=req.body.metaData;
    console.log('meta data');
    console.log(req.body);
    var date = new Date(event.start.dateTime);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dateString = year + '-' + month + '-' + day;

    
    console.log("date string");
    console.log(date);
    console.log(dateString);

    calender_proxy.getEventsForDate(dateString).then((events) => {
        if (events.length > 0) {
            //there is already scheduled event
            res.status(403);
            res.send(events);

        } else {
            calender_proxy.addEvent(event).then(function (data) {
                console.log("before adding user 11111");

                console.log(metaData);
                let fullName=metaData.firstName+' '+ metaData.lastName;
                let email=metaData.email;
                let dayOfMonth=metaData.dayOfMonth;

                console.log("before adding user");
                dhanaUserStore.createUser(fullName,email,'0022212222',dayOfMonth).then((dynamoData)=>{
                    console.log("User"+fullName+" added to data base");
                    console.log("promises called");
                    res.send(data);
                }).catch((err)=>{
                    console.log(err);
                    res.status(500);

                });
                

            }).catch(function (err) {
                res.status(500);
            });
        }
    })


});

function getEmailTemplate(requestor,owner,date,eventId){
    return '\r\n<html>\r\n\r\n<head>\r\n  <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=utf-8\" \/>\r\n\r\n  <style type=\"text\/css\">\r\n   \r\n\r\n    #bodyCellFooter{margin:0; padding:0; width:100% !important;padding-top:39px;padding-bottom:15px;}\r\n\r\n    #templateContainer{\r\n      border: 1px solid #e2e2e2;\r\n      border-radius: 4px;\r\n      background-clip: padding-box;\r\n      border-spacing: 0;\r\n    }\r\n\r\n    p {\r\n      color:#545454;\r\n      display:block;\r\n      font-family:Helvetica;\r\n      font-size:16px;\r\n      line-height:1.500em;\r\n      font-style:normal;\r\n      font-weight:normal;\r\n      letter-spacing:normal;\r\n      margin-top:0;\r\n      margin-right:0;\r\n      margin-bottom:15px;\r\n      margin-left:0;\r\n      text-align:left;\r\n    }\r\n\r\n    .bodyContent{\r\n      color:#505050;\r\n      font-family:Helvetica;\r\n      font-size:14px;\r\n      line-height:150%;\r\n      padding-top:3.143em;\r\n      padding-right:3.5em;\r\n      padding-left:3.5em;\r\n      padding-bottom:3.143em;\r\n      text-align:left;\r\n    }\r\n\r\n    a.blue-btn {\r\n      background: #5098ea;\r\n      display: inline-block;\r\n      color: #FFFFFF;\r\n      border-top:10px solid #5098ea;\r\n      border-bottom:10px solid #5098ea;\r\n      border-left:20px solid #5098ea;\r\n      border-right:20px solid #5098ea;\r\n      text-decoration: none;\r\n      font-size: 14px;\r\n      margin-top: 1.0em;\r\n      border-radius: 3px 3px 3px 3px;\r\n      background-clip: padding-box;\r\n    }\r\n\r\n  <\/style>\r\n<\/head>\r\n\r\n<body yahoo bgcolor=\"#ffffff\">\r\n<table width=\"100%\" bgcolor=\"#ffffff\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\">\r\n<tr>\r\n  <td>\r\n    <table bgcolor=\"#ffffff\" class=\"content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n      <tr>\r\n\t\t\t\t<td align=\"center\" valign=\"top\">\r\n\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" id=\"templateContainer\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td valign=\"top\" class=\"bodyContent\" mc:edit=\"body_content\">\r\n                  <p>Hi ' + owner + '<\/p>\r\n\t\t\t\t  <p>' + requestor + ' is requeting to obtain your Dhana slot on ' + date + ' . To allow or deny the request, please click next<\/p>\r\n                  <a class=\"blue-btn\" href=\"http:\/\/localhost:3000\/dhana\/approve\/?key='+eventId+'"><strong>Next<\/strong><\/a>\r\n\t\t\t\t\t\t\t\t<\/td>\r\n\t\t\t\t\t\t\t<\/tr>\r\n\t\t\t\t\t\t<\/table>\r\n\t\t\t\t\t<\/td>\r\n\t\t\t<\/tr>\r\n\t\t\r\n\r\n    <\/table>\r\n    <\/td>\r\n  <\/tr>\r\n<\/table>\r\n<\/body>\r\n<\/html>\r\n';

}



module.exports = router;
