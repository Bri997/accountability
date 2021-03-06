
const auth = require('./middleware/auth')
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {Task} = require('./taskModel')
const {User} = require("./models/user")
router.get('/', auth, (req, res) => {

  User.findById(req.user._id)
  .populate({ 
    path: 'tasks',
    populate: {
      path: 'timeSessions',
      model: 'TimeTracker'
    } 
 })
  .then(user => {
    res.json(user.tasks)
  })

   
  .catch(err => {
    console.log(err)
      res.status(500).json({error: "something wrong in get "})
    })
});




router.post('/', auth, jsonParser, (req, res) => {

    const requiredFields = ['taskName', 'timeCommit'];
    for (let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if (!(field in req.body)){
                    const message = `Missing \`${field}\` in request body`;
                    console.log(message);
                    return res.status(400).send(message)
        }
    }

  User.findById(req.user._id)
  .then(user => {
    return Task
    .create({
      name: req.body.taskName,
      timeCommit: req.body.timeCommit

    })
    .then(task => {
      task.user = user._id,
      user.tasks.push(task._id)
      return user.save().then(user => {
        return task.save()
      })
    })
  })
    
    .then(task => res.status(201).json(task))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "Server error post problem"})
    })
});



router.post('/', jsonParser, (req, res) => {

  const requiredFields = ['timeStart', "timeStop"]
    for (let i = 0; i , requiredFields.length; i++){
      const field = requiredFields[i];
      if (!(field in req.body)){
          const message = `Missing ${field} in request body`;
          
          return res.status(400).send(message)
      }      
    }
    Task
    .create({
      timeStart: req.body.timeStart,
      timeStop: req.body.timeStop

    })
})


router.put('/:id', jsonParser, (req, res) => {

  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ${req.body.id} must match.`)
      console.log(message);
      return res.status(400).json({message:message})
   }

   const toUpdate = {}
   const updateableFields = ["name", 'timeCommit'];

   updateableFields.forEach(field => {
     if (field in req.body) {
       toUpdate[field]= req.body[field]
     }
   });

   Task
   .findByIdAndUpdate(req.params.id, {$set: toUpdate})
   .then(task => res.status(204).json({message: `sucess`}))
   .catch(err => res.status(500).json({message: `Internal server error put`}));
});

router.delete('/:id', (req, res) => {

  Task
    .findByIdAndRemove(req.params.id)
    .then(task => res.status(204).json({message: "deleted"}))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: `Internal server error delete`})});
});



router.use('*', function (req, res){
  res.status(404).json({message: `Woops 404 not found`});
});









  
  module.exports = router;
