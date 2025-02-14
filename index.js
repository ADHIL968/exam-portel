require('dotenv').config()
const express = require('express')
const app = express()

app.set('view engine', 'ejs')

const cookieParser = require('cookie-parser')
const connectDatabase = require('./config/database')
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))



const teacherRoute = require('./routes/teacher')
const studentRoute = require('./routes/student')

app.use('/admin', teacherRoute)
app.use('/', studentRoute)


const port = process.env.port || 3000
app.listen(port, () => {
    console.log('server started')
    connectDatabase()
})