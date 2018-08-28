const mongoose = require('mongoose');

// Creating a Mongoose Schema of Label.
const labelSchema = mongoose.Schema({
    labelName: String,
});

// Export Model.
module.exports = mongoose.model('label', labelSchema);