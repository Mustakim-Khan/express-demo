const mongoose = require('mongoose')

const coursesSchema = mongoose.Schema({
    name: {type: String, required: true}
});

const coursesModel = mongoose.model('courses', coursesSchema);
module.exports = coursesModel;