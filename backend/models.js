const mongoose = require('mongoose');
const { Schema } = mongoose;

const dashboardSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
}, { collection: 'dashboard_database' }); // Set the collection name here

const DashboardModel = mongoose.model('dashboard_database', dashboardSchema);

module.exports = DashboardModel;
