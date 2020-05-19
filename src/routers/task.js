const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        // await req.user.populate('tasks').execPopulate
        // res.send(req.user.tasks)
        const tasks = await Task.find({ owner: req.user._id})
        
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(404).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))



    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid parameters provided' })
    }

    try {   
        // alternative syntax which bypasses middlewar/pre() type methods
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // // const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
      
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;