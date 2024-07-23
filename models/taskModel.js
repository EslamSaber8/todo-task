const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema(
  {
    image:  String,
    title: String,
    desc: String,
    priority: {
      type: String,
      enum: ["low" , "medium" , "high"],
      default: "workshop",
  },
    status: String,
    user: String,
    dueDate:Date
  })

module.exports = mongoose.model('Review', reviewSchema);

