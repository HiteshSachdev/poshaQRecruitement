const mongoose = require('mongoose');

// Creating a Mongoose Schema of Task.
const taskSchema = mongoose.Schema({
    taskName: String,
    labelName: String,
});

// Export Model.
module.exports = mongoose.model('task', taskSchema);