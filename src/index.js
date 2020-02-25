const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// middleware calls

// disable a type of request
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// maintanence mode engage
// app.use((req, res, next) => {
//     res.status(503).send('Server in maintanence, come back soon')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})