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

// Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)
// timeStop: Date.now()


router.put('/:id', jsonParser, (req, res) =>{
    Task
    .findByIdAndUpdate(req.params.TaskId, {$set: {timeStop: Date.now()}})
    .then(timeSession => {
        task.timeSessions.push(timeSession._id)
        task.save().then(task => {
            res.status(201).json(timeSession)
        });
        
    })
    .catch(err => {
        res.status(500).json({error: "did not put"})
    })
})

// router.put('/:id', jsonParser, (req, res) => {
   
    
//     .then(task => {
//         return TimeTracker.create({
//             task: task._id,
//             timeStop: Date.now()
            
//         })
//         .then(timeSession => {
//             task.timeSessions.push(timeSession._id)
//             task.save().then(task => {
//                 res.status(201).json(timeSession)
//             })
//         })

//     })
//     .catch(err => {
//         res.status(500).json({error:"did not find the time session"})
//     })

// })











module.exports = router;