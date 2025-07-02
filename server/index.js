const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/Feedback');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/feedbackdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/api/feedback', async (req, res) => {
  try {
    const allFeedback = await Feedback.find();
    res.json(allFeedback);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send('Feedback saved');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
