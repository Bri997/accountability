const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Task, TimeTracker} = require('./taskModel')
const user = require ("./models/user.js")





router.get('/:TaskId', (req, res) => {
    Task
    .findById(req.params.TaskId)
    .populate("timeSessions")
    .then(task => {
        res.json(task.timeSessions)
    })
    .catch(err => {
        res.status(500).json({error:"did not find the time session"})
    })
});


router.post('/:TaskId', jsonParser, (req, res) => {
    Task
    
    .findById(req.params.TaskId)
    .then(task => {
        return TimeTracker.create({
            task: task._id,
            timeStart: Date.now()
            
        })
        .then(timeSession => {
            task.timeSessions.push(timeSession._id)
            task.save().then(task => {
                res.status(201).json(timeSession)
            })
        })

    })
    .catch(err => {
        res.status(500).json({error:"did not find the time session"})
    })

})




router.put('/:timeSession', jsonParser, (req, res) =>{
    
    TimeTracker
    .findByIdAndUpdate(req.params.timeSession, {$set: {timeStop: Date.now()}})
    .then(timeSession => {
        res.status(201).json(timeSession)
                
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "did not put"})
    })
});












module.exports = router;