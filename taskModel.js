'use strict';





const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const taskSchema =  mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    name: String,
    timeCommit: Number,
    timeSessions: [{type: mongoose.Schema.Types.ObjectId,ref:'TimeTracker'}]
}); 


const timeTrackerSchema = mongoose.Schema({
    timeStart : Date,
    timeStop : Date,
    task: {type: mongoose.Schema.Types.ObjectId,ref:'Task'}
});    
    

const Task = mongoose.model('Task', taskSchema);
const TimeTracker = mongoose.model('TimeTracker', timeTrackerSchema);

module.exports = {Task, TimeTracker}

