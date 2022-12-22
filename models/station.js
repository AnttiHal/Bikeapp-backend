const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: String,
    required: true,
  },
  
})

module.exports = mongoose.model('Station', schema)