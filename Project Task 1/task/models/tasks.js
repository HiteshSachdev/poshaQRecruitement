const mongoose = require('mongoose');

// Creating a Mongoose Schema of Task.
const tasksSchema = mongoose.Schema({
    category: String
});

// Export Model.
module.exports = mongoose.model('task', tasksSchema);