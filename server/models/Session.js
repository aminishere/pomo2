const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionType: {
    type: String,
    enum: ['Pomodoro', 'Short Break', 'Long Break'],
    required: true,
  },
  duration: {
    type: Number, // duration in seconds
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
