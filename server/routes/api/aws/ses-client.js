var awsConfig=require('../../../config').aws;
var AWS = require('aws-sdk');
AWS.config.update({
    region: awsConfig.region,
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey
});


module.exports.sendEmail=function sendEmail(from, to, body, subject) {
    //Create sendEmail params 
    var params = {
        Destination: { /* required */
            ToAddresses: [
                to,
                /* more items */
            ]
        },
        Message: { /* required */
            Body: { /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: body
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: from/* required */
    }

    return new AWS.SES().sendEmail(params).promise();
}



