const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Task, TimeTracker} = require('./taskModel')



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




router.put('/:TaskId', jsonParser, (req, res) =>{
    
    Task
    .findByIdAndUpdate(req.params.TaskId, {$set: {timeStop: Date.now()}})
    .then(timeSession => {
        res.status(201).json(timeSession)
                
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "did not put"})
    })
});












module.exports = router;