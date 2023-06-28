const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DashboardModel = require('./models');

const app = express();
const PORT = 3000; // Or any other desired port number

const MONGODB_URI = 'mongodb://127.0.0.1:27017/test'; // Replace with your MongoDB connection URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Enable CORS for all routes
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Get all dashboard data
app.get('/api/test', async (req, res) => {
  try {
    const data = await DashboardModel.find();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API route to handle the query and retrieve the data
app.get('/api/test/chart', async (req, res) => {
  try {
    const result = await DashboardModel.aggregate([
      { $match: { sector: 'Energy', country: 'United States of America' } },
      {
        $group: {
          _id: '$topic',
          averageIntensity: { $avg: '$intensity' },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error('Error retrieving chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
