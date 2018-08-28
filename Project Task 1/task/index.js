const _ = require('lodash');
const mongoose = require('mongoose');
const Task = require('./models/tasks');

bucketSize = 2;
const submission = async (client, dbName, collectionName, bucketSize) => {
    // Use async-await and lodash to complete this task.
    // client = Mongo server,
    // dbName = Your database name,
    // bucketSize = input variable, can be any integer
    // START your Code

    // Declarations
    finalObject = {}, maintain = [];
    var connectionString = client + dbName;

    // Connect to the DB
    mongoose.connect(connectionString, { useNewUrlParser: true });
    var db = mongoose.connection;

    // Check everytime if error occurs or not.
    db.on("error", console.error.bind(console, "connection error"));

    // Check for once only if connection is open.
    db.once("open", function (callback) {
        console.log("Connection Succeeded");
    });

    // Get records from the DB and store it in test_example variable.
    var test_example = await Task.find({}, {_id: 1, category: 1});
    
    // Process the Array returned from the DB to get the Desired Output.
    for(var i in test_example){
        var temp = test_example[i].category;
        index = 0;
        if(maintain.indexOf(temp) == -1){        
            maintain.push(temp);
            var tempArray = [];
            _.partition(test_example, ['category', temp])[0].map(function(o){
                tempArray.push(o._id);
            })
            var str = _.chunk( tempArray, bucketSize);
            finalObject[temp] = str;            
        }
     };
     console.log(finalObject);
    // END your code  
  };

  submission("mongodb://taskUser:taskUser1234@ds235352.mlab.com:35352/", "task", "task", bucketSize);