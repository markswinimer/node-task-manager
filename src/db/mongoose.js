const mongoose = require('mongoose')

// MUST RUN MONGOD SERVER FROM COMMAND LINE FIRST
// Start the Mongod service
// /Users/markswinimer/mongodb/bin/mongod --dbpath=/Users/markswinimer/mongodb-data

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,

    // indicated for deprecation notice
    useFindAndModify: false,
    useUnifiedTopology: true
})