import { Schema, model } from 'mongoose'

const schema = new Schema({
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

export default model('Station', schema)