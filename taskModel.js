'use strict';

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const taskSchema =  mongoose.Schema({
    name: String,
    timeCommit: Number
}); 


const timeTrackerSchema = mongoose.Schema({
    timeStart : Date,
    timeStop : Date
});    
    

const Task = mongoose.model('Task', taskSchema);
const TimeTracker = mongoose.model('TimeTracker', timeTrackerSchema)

module.exports = {Task, TimeTracker}

