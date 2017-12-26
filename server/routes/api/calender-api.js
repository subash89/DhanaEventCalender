var express = require('express');
var router = express.Router();
var calender_proxy = require('./google-api/calender-proxy');
var sesClient=require('./aws/ses-client');
var config= require('../../config');
var userStore=require('./aws/dynamo-client');
var stringFormat=require('string-template');
var dateTimeformat = require('date-format');


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




router.post('/request/reject',function(req,res,next){

    var key = req.query.key; // $_GET["id"]
    var message=req.body.message;

    console.log(key);
    var jsonString=new Buffer(key, 'base64').toString('ascii');
    console.log(jsonString);
    var approvalInfo=JSON.parse(jsonString);

    var email=approvalInfo.email;
    var name=approvalInfo.fullName;
    var date=approvalInfo.date;
    var eventId=approvalInfo.eventId;

    calender_proxy.getEventById(eventId).then((event)=>{

        console.log(event);
        var currentOwner=event.summary;
        var eventDate=new Date(event.start.dateTime);
        
        var dateString=dateTimeformat.asString('yyyy-MM-dd',eventDate);
        var link=event.htmlLink;

        sesClient.sendEmail(config.email.sender,email,getRejectionEmailTemplate(name,dateString,message,currentOwner),"Dhana request Reject Notice").then((d)=>{
            console.log('email sent successfully');
            res.status(200);
            res.send();
        }).catch((Mailerr)=>{
            console.log('email Error');
            console.log(Mailerr);

            res.status(500);
            res.send();
        });;

    })
    .catch((err)=>{
        console.log(err);
        res.status(500);
        res.send();
    })




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
    console.log("approval info date");
    console.log(date);
    var eventId=approvalInfo.eventId;

    console.log('event id'+eventId);
    calender_proxy.getEventById(eventId).then((event)=>{

        console.log(event);
        event.summary=name;
        event.description=name;
        var eventDate=new Date(event.start.dateTime);
        var dateString=dateTimeformat.asString('yyyy-MM-dd',eventDate);
        var link=event.htmlLink;

        calender_proxy.updateEvent(event).then((data)=>{
            console.log("inside update");
            console.log(getApprovalEmailTemplate(name,date));
            sesClient.sendEmail(config.email.sender,email,getApprovalEmailTemplate(name,dateString,link),"Dhana request Approval Notice").then((mailResponse)=>{

                console.log('mail sent');
                res.status(200);
                res.send();
            })
            .catch((Mailerr)=>{
                console.log('mail error');

                console.log(Mailerr);
                res.status(500);
                res.send();
            });

        })
        .catch((err)=>{
            console.log(err);
            res.status(500);
            res.send();
          //  sesClient.sendEmail('subashsdm@gmail.com',email,"You dhana was not approved","Dhana request Approval");

        });

    })
    .catch((err)=>{
        console.log(err);
        res.status(500);
        res.send();
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
        
                    let content=getRequestEmailTemplate(fName+' '+lastName,currentOwner,requestDate,encodedString);
        
        
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
                let mobile=metaData.mobile;

                let dayOfMonth=metaData.dayOfMonth;

                console.log("before adding user");
                dhanaUserStore.createUser(fullName,email,mobile,dayOfMonth).then((dynamoData)=>{
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





function getRequestEmailTemplate(requestor,owner,date,eventId){
    return '\r\n<html>\r\n\r\n<head>\r\n  <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=utf-8\" \/>\r\n\r\n  <style type=\"text\/css\">\r\n   \r\n\r\n    #bodyCellFooter{margin:0; padding:0; width:100% !important;padding-top:39px;padding-bottom:15px;}\r\n\r\n    #templateContainer{\r\n      border: 1px solid #e2e2e2;\r\n      border-radius: 4px;\r\n      background-clip: padding-box;\r\n      border-spacing: 0;\r\n    }\r\n\r\n    p {\r\n      color:#545454;\r\n      display:block;\r\n      font-family:Helvetica;\r\n      font-size:16px;\r\n      line-height:1.500em;\r\n      font-style:normal;\r\n      font-weight:normal;\r\n      letter-spacing:normal;\r\n      margin-top:0;\r\n      margin-right:0;\r\n      margin-bottom:15px;\r\n      margin-left:0;\r\n      text-align:left;\r\n    }\r\n\r\n    .bodyContent{\r\n      color:#505050;\r\n      font-family:Helvetica;\r\n      font-size:14px;\r\n      line-height:150%;\r\n      padding-top:3.143em;\r\n      padding-right:3.5em;\r\n      padding-left:3.5em;\r\n      padding-bottom:3.143em;\r\n      text-align:left;\r\n    }\r\n\r\n    a.blue-btn {\r\n      background: #5098ea;\r\n      display: inline-block;\r\n      color: #FFFFFF;\r\n      border-top:10px solid #5098ea;\r\n      border-bottom:10px solid #5098ea;\r\n      border-left:20px solid #5098ea;\r\n      border-right:20px solid #5098ea;\r\n      text-decoration: none;\r\n      font-size: 14px;\r\n      margin-top: 1.0em;\r\n      border-radius: 3px 3px 3px 3px;\r\n      background-clip: padding-box;\r\n    }\r\n\r\n  <\/style>\r\n<\/head>\r\n\r\n<body yahoo bgcolor=\"#ffffff\">\r\n<table width=\"100%\" bgcolor=\"#ffffff\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\">\r\n<tr>\r\n  <td>\r\n    <table bgcolor=\"#ffffff\" class=\"content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n      <tr>\r\n\t\t\t\t<td align=\"center\" valign=\"top\">\r\n\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" id=\"templateContainer\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td valign=\"top\" class=\"bodyContent\" mc:edit=\"body_content\">\r\n                  <p>Hi ' + owner + '<\/p>\r\n\t\t\t\t  <p>' + requestor + ' is requeting to obtain your Dhana slot on ' + date + ' . To allow or deny the request, please click next<\/p>\r\n                  <a class=\"blue-btn\" href=\"http:\/\/localhost:3000\/dhana\/approve\/?key='+eventId+'"><strong>Next<\/strong><\/a>\r\n\t\t\t\t\t\t\t\t<\/td>\r\n\t\t\t\t\t\t\t<\/tr>\r\n\t\t\t\t\t\t<\/table>\r\n\t\t\t\t\t<\/td>\r\n\t\t\t<\/tr>\r\n\t\t\r\n\r\n    <\/table>\r\n    <\/td>\r\n  <\/tr>\r\n<\/table>\r\n<\/body>\r\n<\/html>\r\n';

}

function getApprovalEmailTemplate(name,date,link){
    return stringFormat("<!doctype html>\r\n<html>\r\n  <head>\r\n    <meta name=\"viewport\" content=\"width=device-width\" \/>\r\n    <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=UTF-8\" \/>\r\n    <title>Simple Transactional Email<\/title>\r\n    <style>\r\n      \/* -------------------------------------\r\n          GLOBAL RESETS\r\n      ------------------------------------- *\/\r\n      img {\r\n        border: none;\r\n        -ms-interpolation-mode: bicubic;\r\n        max-width: 100%; }\r\n\r\n      body {\r\n        background-color: #f6f6f6;\r\n        font-family: sans-serif;\r\n        -webkit-font-smoothing: antialiased;\r\n        font-size: 14px;\r\n        line-height: 1.4;\r\n        margin: 0;\r\n        padding: 0;\r\n        -ms-text-size-adjust: 100%;\r\n        -webkit-text-size-adjust: 100%; }\r\n\r\n      table {\r\n        border-collapse: separate;\r\n        mso-table-lspace: 0pt;\r\n        mso-table-rspace: 0pt;\r\n        width: 100%; }\r\n        table td {\r\n          font-family: sans-serif;\r\n          font-size: 14px;\r\n          vertical-align: top; }\r\n\r\n      \/* -------------------------------------\r\n          BODY & CONTAINER\r\n      ------------------------------------- *\/\r\n\r\n      .body {\r\n        background-color: #f6f6f6;\r\n        width: 100%; }\r\n\r\n      \/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something *\/\r\n      .container {\r\n        display: block;\r\n        Margin: 0 auto !important;\r\n        \/* makes it centered *\/\r\n        max-width: 580px;\r\n        padding: 10px;\r\n        width: 580px; }\r\n\r\n      \/* This should also be a block element, so that it will fill 100% of the .container *\/\r\n      .content {\r\n        box-sizing: border-box;\r\n        display: block;\r\n        Margin: 0 auto;\r\n        max-width: 580px;\r\n        padding: 10px; }\r\n\r\n      \/* -------------------------------------\r\n          HEADER, FOOTER, MAIN\r\n      ------------------------------------- *\/\r\n      .main {\r\n        background: #ffffff;\r\n        border-radius: 3px;\r\n        width: 100%; }\r\n\r\n      .wrapper {\r\n        box-sizing: border-box;\r\n        padding: 20px; }\r\n\r\n      .content-block {\r\n        padding-bottom: 10px;\r\n        padding-top: 10px;\r\n      }\r\n\r\n      .footer {\r\n        clear: both;\r\n        Margin-top: 10px;\r\n        text-align: center;\r\n        width: 100%; }\r\n        .footer td,\r\n        .footer p,\r\n        .footer span,\r\n        .footer a {\r\n          color: #999999;\r\n          font-size: 12px;\r\n          text-align: center; }\r\n\r\n      \/* -------------------------------------\r\n          TYPOGRAPHY\r\n      ------------------------------------- *\/\r\n      h1,\r\n      h2,\r\n      h3,\r\n      h4 {\r\n        color: #000000;\r\n        font-family: sans-serif;\r\n        font-weight: 400;\r\n        line-height: 1.4;\r\n        margin: 0;\r\n        Margin-bottom: 30px; }\r\n\r\n      h1 {\r\n        font-size: 35px;\r\n        font-weight: 300;\r\n        text-align: center;\r\n        text-transform: capitalize; }\r\n\r\n      p,\r\n      ul,\r\n      ol {\r\n        font-family: sans-serif;\r\n        font-size: 14px;\r\n        font-weight: normal;\r\n        margin: 0;\r\n        Margin-bottom: 15px; }\r\n        p li,\r\n        ul li,\r\n        ol li {\r\n          list-style-position: inside;\r\n          margin-left: 5px; }\r\n\r\n      a {\r\n        color: #3498db;\r\n        text-decoration: underline; }\r\n\r\n      \/* -------------------------------------\r\n          BUTTONS\r\n      ------------------------------------- *\/\r\n      .btn {\r\n        box-sizing: border-box;\r\n        width: 100%; }\r\n        .btn > tbody > tr > td {\r\n          padding-bottom: 15px; }\r\n        .btn table {\r\n          width: auto; }\r\n        .btn table td {\r\n          background-color: #ffffff;\r\n          border-radius: 5px;\r\n          text-align: center; }\r\n        .btn a {\r\n          background-color: #ffffff;\r\n          border: solid 1px #3498db;\r\n          border-radius: 5px;\r\n          box-sizing: border-box;\r\n          color: #3498db;\r\n          cursor: pointer;\r\n          display: inline-block;\r\n          font-size: 14px;\r\n          font-weight: bold;\r\n          margin: 0;\r\n          padding: 12px 25px;\r\n          text-decoration: none;\r\n          text-transform: capitalize; }\r\n\r\n      .btn-primary table td {\r\n        background-color: #3498db; }\r\n\r\n      .btn-primary a {\r\n        background-color: #3498db;\r\n        border-color: #3498db;\r\n        color: #ffffff; }\r\n\r\n      \/* -------------------------------------\r\n          OTHER STYLES THAT MIGHT BE USEFUL\r\n      ------------------------------------- *\/\r\n      .last {\r\n        margin-bottom: 0; }\r\n\r\n      .first {\r\n        margin-top: 0; }\r\n\r\n      .align-center {\r\n        text-align: center; }\r\n\r\n      .align-right {\r\n        text-align: right; }\r\n\r\n      .align-left {\r\n        text-align: left; }\r\n\r\n      .clear {\r\n        clear: both; }\r\n\r\n      .mt0 {\r\n        margin-top: 0; }\r\n\r\n      .mb0 {\r\n        margin-bottom: 0; }\r\n\r\n      .preheader {\r\n        color: transparent;\r\n        display: none;\r\n        height: 0;\r\n        max-height: 0;\r\n        max-width: 0;\r\n        opacity: 0;\r\n        overflow: hidden;\r\n        mso-hide: all;\r\n        visibility: hidden;\r\n        width: 0; }\r\n\r\n      .powered-by a {\r\n        text-decoration: none; }\r\n\r\n      hr {\r\n        border: 0;\r\n        border-bottom: 1px solid #f6f6f6;\r\n        Margin: 20px 0; }\r\n\r\n      \/* -------------------------------------\r\n          RESPONSIVE AND MOBILE FRIENDLY STYLES\r\n      ------------------------------------- *\/\r\n      @media only screen and (max-width: 620px) {\r\n        table[class=body] h1 {\r\n          font-size: 28px !important;\r\n          margin-bottom: 10px !important; }\r\n        table[class=body] p,\r\n        table[class=body] ul,\r\n        table[class=body] ol,\r\n        table[class=body] td,\r\n        table[class=body] span,\r\n        table[class=body] a {\r\n          font-size: 16px !important; }\r\n        table[class=body] .wrapper,\r\n        table[class=body] .article {\r\n          padding: 10px !important; }\r\n        table[class=body] .content {\r\n          padding: 0 !important; }\r\n        table[class=body] .container {\r\n          padding: 0 !important;\r\n          width: 100% !important; }\r\n        table[class=body] .main {\r\n          border-left-width: 0 !important;\r\n          border-radius: 0 !important;\r\n          border-right-width: 0 !important; }\r\n        table[class=body] .btn table {\r\n          width: 100% !important; }\r\n        table[class=body] .btn a {\r\n          width: 100% !important; }\r\n        table[class=body] .img-responsive {\r\n          height: auto !important;\r\n          max-width: 100% !important;\r\n          width: auto !important; }}\r\n\r\n      \/* -------------------------------------\r\n          PRESERVE THESE STYLES IN THE HEAD\r\n      ------------------------------------- *\/\r\n      @media all {\r\n        .ExternalClass {\r\n          width: 100%; }\r\n        .ExternalClass,\r\n        .ExternalClass p,\r\n        .ExternalClass span,\r\n        .ExternalClass font,\r\n        .ExternalClass td,\r\n        .ExternalClass div {\r\n          line-height: 100%; }\r\n        .apple-link a {\r\n          color: inherit !important;\r\n          font-family: inherit !important;\r\n          font-size: inherit !important;\r\n          font-weight: inherit !important;\r\n          line-height: inherit !important;\r\n          text-decoration: none !important; }\r\n        .btn-primary table td:hover {\r\n          background-color: #34495e !important; }\r\n        .btn-primary a:hover {\r\n          background-color: #34495e !important;\r\n          border-color: #34495e !important; } }\r\n\r\n    <\/style>\r\n  <\/head>\r\n  <body class=\"\">\r\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\">\r\n      <tr>\r\n        <td>&nbsp;<\/td>\r\n        <td class=\"container\">\r\n          <div class=\"content\">\r\n\r\n            <!-- START CENTERED WHITE CONTAINER -->\r\n            <span class=\"preheader\">This is preheader text. Some clients will show this text as a preview.<\/span>\r\n            <table class=\"main\">\r\n\r\n              <!-- START MAIN CONTENT AREA -->\r\n              <tr>\r\n                <td class=\"wrapper\">\r\n                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n                    <tr>\r\n                      <td>\r\n                        <p>Dear {0},<\/p>\r\n                        <p>Your request to offer dhana on {1} has been approved. Click  <a href=\"{2}\">here<\/a> to see it on calender.<\/p>\r\n                    <\/br>\r\n                      <p>Thanks,<\/p><p> NC Buddhist Vihara<\/p>\r\n                      <\/td>\r\n                    <\/tr>\r\n                  <\/table>\r\n                <\/td>\r\n              <\/tr>\r\n\r\n            <!-- END MAIN CONTENT AREA -->\r\n            <\/table>\r\n\r\n            <!-- START FOOTER -->\r\n\r\n            <!-- END FOOTER -->\r\n\r\n          <!-- END CENTERED WHITE CONTAINER -->\r\n          <\/div>\r\n        <\/td>\r\n        <td>&nbsp;<\/td>\r\n      <\/tr>\r\n    <\/table>\r\n  <\/body>\r\n<\/html>\r\n",[name,date,link]);
}


function getRejectionEmailTemplate(name,date,message,currentOwner){
    return stringFormat("<!doctype html>\r\n<html>\r\n  <head>\r\n    <meta name=\"viewport\" content=\"width=device-width\" \/>\r\n    <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=UTF-8\" \/>\r\n    <title>Simple Transactional Email<\/title>\r\n    <style>\r\n      \/* -------------------------------------\r\n          GLOBAL RESETS\r\n      ------------------------------------- *\/\r\n      img {\r\n        border: none;\r\n        -ms-interpolation-mode: bicubic;\r\n        max-width: 100%; }\r\n\r\n      body {\r\n        background-color: #f6f6f6;\r\n        font-family: sans-serif;\r\n        -webkit-font-smoothing: antialiased;\r\n        font-size: 14px;\r\n        line-height: 1.4;\r\n        margin: 0;\r\n        padding: 0;\r\n        -ms-text-size-adjust: 100%;\r\n        -webkit-text-size-adjust: 100%; }\r\n\r\n      table {\r\n        border-collapse: separate;\r\n        mso-table-lspace: 0pt;\r\n        mso-table-rspace: 0pt;\r\n        width: 100%; }\r\n        table td {\r\n          font-family: sans-serif;\r\n          font-size: 14px;\r\n          vertical-align: top; }\r\n\r\n      \/* -------------------------------------\r\n          BODY & CONTAINER\r\n      ------------------------------------- *\/\r\n\r\n      .body {\r\n        background-color: #f6f6f6;\r\n        width: 100%; }\r\n\r\n      \/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something *\/\r\n      .container {\r\n        display: block;\r\n        Margin: 0 auto !important;\r\n        \/* makes it centered *\/\r\n        max-width: 580px;\r\n        padding: 10px;\r\n        width: 580px; }\r\n\r\n      \/* This should also be a block element, so that it will fill 100% of the .container *\/\r\n      .content {\r\n        box-sizing: border-box;\r\n        display: block;\r\n        Margin: 0 auto;\r\n        max-width: 580px;\r\n        padding: 10px; }\r\n\r\n      \/* -------------------------------------\r\n          HEADER, FOOTER, MAIN\r\n      ------------------------------------- *\/\r\n      .main {\r\n        background: #ffffff;\r\n        border-radius: 3px;\r\n        width: 100%; }\r\n\r\n      .wrapper {\r\n        box-sizing: border-box;\r\n        padding: 20px; }\r\n\r\n      .content-block {\r\n        padding-bottom: 10px;\r\n        padding-top: 10px;\r\n      }\r\n\r\n      .footer {\r\n        clear: both;\r\n        Margin-top: 10px;\r\n        text-align: center;\r\n        width: 100%; }\r\n        .footer td,\r\n        .footer p,\r\n        .footer span,\r\n        .footer a {\r\n          color: #999999;\r\n          font-size: 12px;\r\n          text-align: center; }\r\n\r\n      \/* -------------------------------------\r\n          TYPOGRAPHY\r\n      ------------------------------------- *\/\r\n      h1,\r\n      h2,\r\n      h3,\r\n      h4 {\r\n        color: #000000;\r\n        font-family: sans-serif;\r\n        font-weight: 400;\r\n        line-height: 1.4;\r\n        margin: 0;\r\n        Margin-bottom: 30px; }\r\n\r\n      h1 {\r\n        font-size: 35px;\r\n        font-weight: 300;\r\n        text-align: center;\r\n        text-transform: capitalize; }\r\n\r\n      p,\r\n      ul,\r\n      ol {\r\n        font-family: sans-serif;\r\n        font-size: 14px;\r\n        font-weight: normal;\r\n        margin: 0;\r\n        Margin-bottom: 15px; }\r\n        p li,\r\n        ul li,\r\n        ol li {\r\n          list-style-position: inside;\r\n          margin-left: 5px; }\r\n\r\n      a {\r\n        color: #3498db;\r\n        text-decoration: underline; }\r\n\r\n      \/* -------------------------------------\r\n          BUTTONS\r\n      ------------------------------------- *\/\r\n      .btn {\r\n        box-sizing: border-box;\r\n        width: 100%; }\r\n        .btn > tbody > tr > td {\r\n          padding-bottom: 15px; }\r\n        .btn table {\r\n          width: auto; }\r\n        .btn table td {\r\n          background-color: #ffffff;\r\n          border-radius: 5px;\r\n          text-align: center; }\r\n        .btn a {\r\n          background-color: #ffffff;\r\n          border: solid 1px #3498db;\r\n          border-radius: 5px;\r\n          box-sizing: border-box;\r\n          color: #3498db;\r\n          cursor: pointer;\r\n          display: inline-block;\r\n          font-size: 14px;\r\n          font-weight: bold;\r\n          margin: 0;\r\n          padding: 12px 25px;\r\n          text-decoration: none;\r\n          text-transform: capitalize; }\r\n\r\n      .btn-primary table td {\r\n        background-color: #3498db; }\r\n\r\n      .btn-primary a {\r\n        background-color: #3498db;\r\n        border-color: #3498db;\r\n        color: #ffffff; }\r\n\r\n      \/* -------------------------------------\r\n          OTHER STYLES THAT MIGHT BE USEFUL\r\n      ------------------------------------- *\/\r\n      .last {\r\n        margin-bottom: 0; }\r\n\r\n      .first {\r\n        margin-top: 0; }\r\n\r\n      .align-center {\r\n        text-align: center; }\r\n\r\n      .align-right {\r\n        text-align: right; }\r\n\r\n      .align-left {\r\n        text-align: left; }\r\n\r\n      .clear {\r\n        clear: both; }\r\n\r\n      .mt0 {\r\n        margin-top: 0; }\r\n\r\n      .mb0 {\r\n        margin-bottom: 0; }\r\n\r\n      .preheader {\r\n        color: transparent;\r\n        display: none;\r\n        height: 0;\r\n        max-height: 0;\r\n        max-width: 0;\r\n        opacity: 0;\r\n        overflow: hidden;\r\n        mso-hide: all;\r\n        visibility: hidden;\r\n        width: 0; }\r\n\r\n      .powered-by a {\r\n        text-decoration: none; }\r\n\r\n      hr {\r\n        border: 0;\r\n        border-bottom: 1px solid #f6f6f6;\r\n        Margin: 20px 0; }\r\n\r\n      \/* -------------------------------------\r\n          RESPONSIVE AND MOBILE FRIENDLY STYLES\r\n      ------------------------------------- *\/\r\n      @media only screen and (max-width: 620px) {\r\n        table[class=body] h1 {\r\n          font-size: 28px !important;\r\n          margin-bottom: 10px !important; }\r\n        table[class=body] p,\r\n        table[class=body] ul,\r\n        table[class=body] ol,\r\n        table[class=body] td,\r\n        table[class=body] span,\r\n        table[class=body] a {\r\n          font-size: 16px !important; }\r\n        table[class=body] .wrapper,\r\n        table[class=body] .article {\r\n          padding: 10px !important; }\r\n        table[class=body] .content {\r\n          padding: 0 !important; }\r\n        table[class=body] .container {\r\n          padding: 0 !important;\r\n          width: 100% !important; }\r\n        table[class=body] .main {\r\n          border-left-width: 0 !important;\r\n          border-radius: 0 !important;\r\n          border-right-width: 0 !important; }\r\n        table[class=body] .btn table {\r\n          width: 100% !important; }\r\n        table[class=body] .btn a {\r\n          width: 100% !important; }\r\n        table[class=body] .img-responsive {\r\n          height: auto !important;\r\n          max-width: 100% !important;\r\n          width: auto !important; }}\r\n\r\n      \/* -------------------------------------\r\n          PRESERVE THESE STYLES IN THE HEAD\r\n      ------------------------------------- *\/\r\n      @media all {\r\n        .ExternalClass {\r\n          width: 100%; }\r\n        .ExternalClass,\r\n        .ExternalClass p,\r\n        .ExternalClass span,\r\n        .ExternalClass font,\r\n        .ExternalClass td,\r\n        .ExternalClass div {\r\n          line-height: 100%; }\r\n        .apple-link a {\r\n          color: inherit !important;\r\n          font-family: inherit !important;\r\n          font-size: inherit !important;\r\n          font-weight: inherit !important;\r\n          line-height: inherit !important;\r\n          text-decoration: none !important; }\r\n        .btn-primary table td:hover {\r\n          background-color: #34495e !important; }\r\n        .btn-primary a:hover {\r\n          background-color: #34495e !important;\r\n          border-color: #34495e !important; } }\r\n\r\n    <\/style>\r\n  <\/head>\r\n  <body class=\"\">\r\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\">\r\n      <tr>\r\n        <td>&nbsp;<\/td>\r\n        <td class=\"container\">\r\n          <div class=\"content\">\r\n\r\n            <!-- START CENTERED WHITE CONTAINER -->\r\n            <span class=\"preheader\">This is preheader text. Some clients will show this text as a preview.<\/span>\r\n            <table class=\"main\">\r\n\r\n              <!-- START MAIN CONTENT AREA -->\r\n              <tr>\r\n                <td class=\"wrapper\">\r\n                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n                    <tr>\r\n                      <td>\r\n                        <p>Dear {0},<\/p>\r\n                        <p>Your request to offer dhana on {1} has not been approved by the current owner.See message from him below.<div style=\"background:#a7c3ef;\"><p>\"{2}\"<\/p><p>-{3}<\/p><\/div><\/p>\r\n                    <\/br>\r\n                      <p>Thanks,<\/p><p> NC Buddhist Vihara<\/p>\r\n                      <\/td>\r\n                    <\/tr>\r\n                  <\/table>\r\n                <\/td>\r\n              <\/tr>\r\n\r\n            <!-- END MAIN CONTENT AREA -->\r\n            <\/table>\r\n\r\n            <!-- START FOOTER -->\r\n\r\n            <!-- END FOOTER -->\r\n\r\n          <!-- END CENTERED WHITE CONTAINER -->\r\n          <\/div>\r\n        <\/td>\r\n        <td>&nbsp;<\/td>\r\n      <\/tr>\r\n    <\/table>\r\n  <\/body>\r\n<\/html>\r\n",[name,date,message,currentOwner]);
}
module.exports = router;
