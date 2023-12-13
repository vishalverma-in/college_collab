const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'personal'
  },
  description: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  comments: [{
    text: String,
    userName: String,
    postedBy: String,
    created:  {type: Date, default: Date.now},
  }],
  date: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: String,
    default: 'notcompleted'
  }
});

module.exports = mongoose.model('contact', ContactSchema);