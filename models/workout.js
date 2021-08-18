// loading in mongoose and schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// instantiating a new workout schema with day and exercises
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String
      },
      name: {
        type: String
      },
      duration: {
        type: Number
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ],

})

// compiling the workout mongoose model
const Workout = mongoose.model('Workout', WorkoutSchema);

// exporting the workout model as Workout
module.exports.Workout = Workout;