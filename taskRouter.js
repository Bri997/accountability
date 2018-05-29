// import { settings } from "cluster";

// task will have sessions 

// task need to be updated and archived

// task need to be in a format: Name date time commit 

// need to delete tasks

// need to update tasks

// log in  and account settings

// results are a summmary of tasks sessions and group sessions by day then create chart


// bulid models then bulid the route crud EOPNOTSUPP


// look at the blog post app and the node-jwt-auth 



const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();



const {Task} = require('./taskModel')

router.get('/', (req, res) => {
    Task
    .find()
    .then(tasks => {
      res.json(tasks)
    })
    .catch(err => {
      res.status(500).json({error: "something wrong in get "})
    })
});




router.post('/', jsonParser, (req, res) => {

    const requiredFields = ['taskName', 'timeCommit'];
    for (let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if (!(field in req.body)){
                    const message = `Missing \`${field}\` in request body`;
                    console.log(message);
                    return res.status(400).send(message)
        }
    }
    Task
    .create({
      name: req.body.taskName,
      timeCommit: req.body.timeCommit

    })
    .then(task => res.status(201).json(task))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "Server error post problem"})
    })
});

// This is how is should be for the time start crud
// create({
//   timeStart: Date.now()
// })

// router.delete('/:id', (req, res) => {
//     Task.delete(req.params.id);
//     console.log(`Deleted task item \`${req.params.id}\``)
//     res.status(204).end();
// });


// router.put('/:id', jsonParser, (req, res) => {
//     const requiredFields = ['taskName', 'timeCommit'];
//     for (let i=0; i<requiredFields.length; i++) {
//       const field = requiredFields[i];
//       if (!(field in req.body)) {
//         const message = `Missing \`${field}\` in request body`;
//         console.error(message);
//         return res.status(400).send(message);
//       }
//     }
//     if (req.params.id !== req.body.id) {
//       const message = (
//         `Request path id (${req.params.id}) and request body id `
//         `(${req.body.id}) must match`);
//       console.error(message);
//       return res.status(400).send(message);
//     }
//     console.log(`Updating task list \`${req.params.id}\``);
//     const updatedItem = Task.update({
//       id: req.params.id,
//       name: req.body.name,
//       checked: req.body.checked
//     });
//     res.status(200).json(updatedItem);
//   });
  
  module.exports = router;
  