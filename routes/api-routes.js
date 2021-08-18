// loading expreess, routes, workout, and mongoose
const express = require('express')
const router = express.Router();
const { Workout } = require('../models/workout.js')
const mongoose = require("mongoose");

// GET route that retrieves last workout
router.get('/workouts',  async (req, res) => {
    // adding the exercise duration to new field totalDuration
    try {
      var data = await Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: '$exercises.duration'}
          }
        }
      ])
      res.json(data)
    }
    // displays the error if found
    catch(err) {
      res.json(err)
    }
})

// GET route to retrieve the range of workouts
router.get('/workouts/range', (req, res) => {
    // adding the exercise duration to new field totalDuration
    Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: '$exercises.duration'}}
      },
      // sorting workouts based on recent days   
      {
        $sort: { day: -1}
      },
      // limiting the displayed workouts to just the last week  
      {
        $limit: 7
      }
    ])
    .then(data => {
      data = data.reverse()
      res.json(data)
    })
    // displays the error if found
    .catch(err => {
      res.json(err)
    })
})

// POST route to fill in workout body data
router.post('/workouts', async (req, res) => {
    var body = req.body;
    try{
      // creating body content for the workout and displaying the JSON data
      var data = await Workout.create(body)
      res.json(data)
    }
    // displays the error if found
    catch(err) {
      res.json(err)
    }
})

// PUT routet to locate and update workouts based on id
router.put("/workouts/:id", ({ body, params }, res) => {
    // locating workouts based on id params
    Workout.findByIdAndUpdate(
        params.id,
        // appending exercise to user workout
        { $push: { exercises: body } },
        { new: true }
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    // displays the error if found
    .catch(err => {
        res.json(err);
    });
});
  
// exporting the router module
module.exports = router
