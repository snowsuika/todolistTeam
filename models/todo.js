const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '必填']
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: 'todos'
  }
)

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo