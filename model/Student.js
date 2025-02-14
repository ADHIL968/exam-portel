const mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const student = mongoose.Schema({
    id: String,
    username: String,
    password: String,
    result: {
        type: String,
        default:""
    },
    exam: {
        type: Array,
        default:[]
    }
})

student.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

student.methods.validatePassword = async function (userpassword) {
    return await bcrypt.compare(userpassword, this.password)
}


module.exports = mongoose.model('Student', student)