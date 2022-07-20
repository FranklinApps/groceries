const mongoose = require('mongoose');

const DewSchema = new mongoose.Schema({
    task:{type: String, required: [true, "Please enter a a new task"]},
    image:{type: String},
    completed:{type: Boolean, required: [true, "Is the task completed?"]},
    priority:{type: Array, required: [false, "Please rank importance"]}, 
    notes:{type: String,}  
}, {timestamps: true})

const Dew = mongoose.model("Dew", DewSchema);
module.exports = Dew;
