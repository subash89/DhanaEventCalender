var express = require('express');
var router = express.Router();
var calender_proxy=require('./google-api/calender-proxy');


/* GET users listing. */
router.get('/list', function(req, res, next) {

    calender_proxy.getEvents().then(function(data){
        console.log("promises called");
        res.send(data);
    }).catch(function(err){
        res.status(500);
    });
});


router.put('/event', function(req, res, next) {
    var event=req.body;
 
    
        calender_proxy.addEvent(event).then(function(data){
            console.log("promises called");
            res.send(data);
        }).catch(function(err){
            res.status(500);
        });
    });

    


 
module.exports = router;
