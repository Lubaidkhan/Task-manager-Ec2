const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})

  // console.log(tasks)
  res.status(200).json({ tasks })


})

const createTask = asyncWrapper(async (req, res) => {

  // console.log(req.body)
  const task = await Task.create(req.body)

 
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const  id = req.params.id

  console.log("inside gettask",req.params);
  const task = await Task.findOne({ _id: id })
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404))
  }

  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const  id = req.params.id
  const task = await Task.findOneAndDelete({ _id: id })
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404))
  }
  res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res, next) => {
  const  id = req.params.id

  console.log(id)

  const task = await Task.findOneAndUpdate({ _id: id },
    // { $rename: { 'Task Id': '1', 'Name': 'demouser' } },
     req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  console.log(task)

  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
