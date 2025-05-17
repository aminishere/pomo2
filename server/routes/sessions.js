const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// POST /api/sessions
router.post('/', async (req, res) => {
  try {
    const { sessionType, duration } = req.body;

    const newSession = new Session({
      sessionType,
      duration,
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save session' });
  }
});

//GET /api/sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().sort({ completedAt: -1 });
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

module.exports = router;
