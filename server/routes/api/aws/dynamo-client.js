
var awsConfig=require('../../../config').aws;
var AWS = require('aws-sdk');
AWS.config.update({
    region: awsConfig.region,
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey
});



module.exports= function(){

    ddb = new AWS.DynamoDB();

    var tableName = "NC_TEMPLE_DHANA";

    var params = {
        AttributeDefinitions: [
            {
            AttributeName: 'name',
            AttributeType: 'S'
            }
        ],
        KeySchema: [
            {
            AttributeName: 'name',
            KeyType: 'HASH'
            }
        ],

        ProvisionedThroughput: {
            ReadCapacityUnits: 25,
            WriteCapacityUnits: 25
        },

        TableName: tableName,

        StreamSpecification: {
            StreamEnabled: false
        }
    };

    ddb.listTables({})
        .promise()
        .then((data) => {
            const exists = data.TableNames
                .filter(name => {
                    return name === tableName;
                })
                .length > 0;
            if (exists) {
                console.log("Table already exists " + tableName);
                return Promise.resolve();
            }
            else {
                 ddb.createTable(params, function(err, data) {
                    if (err) {
                      console.log("Error", err);
                      return Promise.reject();
                    } else {
                      console.log("Successfully Created Table " + tableName);
                      return Promise.resolve();
                    }
                });
            }
    });

    this.createUser =  function createUser(name, email, phone, dateIndex){
        return new Promise(function(resolve,reject){

            name = formatName(name);

            var params = {
                Item: {
                    "name": {
                    S: name
                    },
                    "email": {
                    S: email
                    },
                    "phone": {
                    S: phone
                    },
                    "dateIndex": {
                    N: dateIndex
                    }
                },
                ReturnConsumedCapacity: "TOTAL",
                TableName: tableName
                };
                ddb.putItem(params, function(err, data) {
                    if (err) {
                        console.log(err, err.stack); // an error occurred
                        reject(err);
                    } else {
                        console.log("Successfully created profile " + name); // successful response
                        resolve(data);
                    }
            });
        });


    }

    this.getUser = function(name) { return new Promise(function(resolve, reject){

       name = formatName(name);

        var params = {
            Key: {
             "name": {
               S: name
              }
            },
            TableName: tableName
           };

           ddb.getItem(params, function(err, data) {
             if (err) {
                 reject(err);
             } else {
                 resolve(data);
             }
            });
    });
  }

  function formatName(name){
      return name.toLowerCase().trim().replace(/ /g,'_')
  }

}
