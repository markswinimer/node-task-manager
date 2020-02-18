require('../src/db/mongoose')
const User = require('../src/models/user')

const _id = '5e41e802c7e16219c0618a44'

User.findByIdAndUpdate(_id, { age: 8 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 8 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const updateAgeAndCount = async (id, age) => {
    // const user = await User.findByIdAndUpdate(id, { age: age })
    // line below is shorthand way of writing this one 
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount(_id, 10).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})