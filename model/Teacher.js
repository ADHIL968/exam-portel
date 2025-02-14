const mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const teacher = mongoose.Schema({
    id: String,
    username: String,
    password: String
})

teacher.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

teacher.methods.validatePassword = async function (userpassword) {
    return await bcrypt.compare(userpassword, this.password)
}


module.exports = mongoose.model('Teacher', teacher)