// loading router, path, and workout model
const router = require('express').Router();
const path = require('path')
const { Workout } = require('../models/workout.js')

// GET route to connect exercise html document
router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
})

// GET route to connect stats html document
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
})

// GET route to find and display available workouts by id
router.get('/exercise/:id', (req, res) => {
  var id = req.params.id
  Workout.findById(id)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

// exporting the router module
module.exports = router
