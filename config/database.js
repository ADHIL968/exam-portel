const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log('connected to db')
    } catch (err) {
        console.log(err)
        console.log('db not connected')
    }
}

module.exports = connectDatabase