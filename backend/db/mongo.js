const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('Connection error', err));

const projectSchema = new mongoose.Schema({
  projectname: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  steps: {
    type: Object,
    required: false
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project };
