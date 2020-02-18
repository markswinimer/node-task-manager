require('../src/db/mongoose')
const Task = require('../src/models/task')

const _id = "5e42dddee92ffd20a2a94aed"

// Task.findByIdAndDelete(_id).then((task) => {
//     console.log(task + 'active')
//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     return console.log('Unable to delete task.')
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    console.log(count)
}

deleteTaskAndCount(_id).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})