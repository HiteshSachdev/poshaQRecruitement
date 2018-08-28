//Importing required modules.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const Label = require('./models/label');
const Task = require('./models/tasks');

app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Connect to the DB
mongoose.connect("mongodb://todouser:todo1234@ds129541.mlab.com:29541/tododb");
var db = mongoose.connection;

// Check everytime if error occurs or not.
db.on("error", console.error.bind(console, "connection error"));

// Check for once only whether the connection is open or not.
db.once("open", function (callback) {
    console.log("Connection Succeeded");
});

// Creates a Label in the DB Collection.
app.post('/api/create_label', async (req, res, next) => {
    console.log("Request received for Creating Label");
    console.log(req.body.labelName);    
    try{
        var label = new Label({
            labelName: req.body.labelName
        });
        var newLabel = await label.save();
        console.log(newLabel);
        if (newLabel) {
            res.status(200).json({
                message:"Succesfully added new Label"
            });
        }       
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }
});

// Deletes the Label from the DB Collection.
app.delete('/api/delete_label', async (req, res, next) => {
    console.log("Request received for Deleting Label");
    console.log(req.body.id);
    try{
        await Label.remove({_id: req.body.id});
        res.status(200).json({
            message: "Successfully Removed Label"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }
});

// Updates the Label in the DB Collection.
app.put('/api/update_label', async (req, res, next) => {
    console.log("Request received for updating label");
    try{
        var updatedLabel = await Label.update(
            {_id: req.body.id},
            {$set:{labelName: req.body.labelName}}
        );
        console.log(updatedLabel);
        res.status(200).json({
            message: "Successfully Updated Label"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }
});

// Creates a Task in the DB Collection.
app.post('/api/create_task', async (req, res, next) => {
    console.log("Request received for Creating Task");
    console.log(req.body.labelName);    
    try{
        var task = new Task({
            taskName: req.body.taskName,
            labelName: req.body.labelName
        });
        var newTask = await task.save();
        console.log(newTask);
        if (newTask) {
            res.status(200).json({
                message:"Succesfully added new Task"
            });
        }       
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }
});

// Deletes a Task from the DB Collection.
app.delete('/api/delete_Task', async (req, res, next) => {
    console.log("Request received for deleting Task");
    console.log(req.body.id);
    try{
        await Task.remove({_id: req.body.id});
        res.status(200).json({
            message: "Successfully Removed Task"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }    
});

// Updates the Task in the DB Collection.
app.patch('/api/update_task', async (req, res, next) => {
    console.log("Request received for updating Task");
    try{
        var updatedTask = await Task.update(
            {_id: req.body.id},
            {$set:{taskName: req.body.taskName}}
        );
        console.log(updatedTask);
        res.status(200).json({
            message: "Successfully Updated Task"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }
});

// Moves a Task from one Label to another in the DB Collection.
app.patch('/api/move_task', async (req, res, next) => {
    console.log("Request received for Moving Task");
    try{
        var movedTask = await Task.update(
            {_id: req.body.id},
            {$set:{labelName: req.body.labelName}}
        );
        console.log(movedTask);
        res.status(200).json({
            message: "Successfully Updated Task"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
        })
    }
});

var port = 8081;
app.listen(port)
console.log(`<- -> i am running on port ${port}`);

