const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    // required: true
    default:"General"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Number,
    default: 0,
    
  }

});

const News = mongoose.model("News", NewsSchema);
module.exports = News;
