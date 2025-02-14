const Student = require('../../model/Student')
const Questions = require('../../model/Questions')
const createToken = require('../../utils/createToken')


exports.getLoginPage = (req, res) => {
    return res.render('student/login', { msg: "" })
}

exports.login = async (req, res) => {
    try {
        const finder = await Student.findOne({ username: req.body.username.toLowerCase() })
        if (finder) {
            const validate = await finder.validatePassword(req.body.password)
            if (!validate) {
                return res.render('student/login', { msg: 'incorrect password' })
            }
            const studentToken = createToken(req.body.username)
            return res.cookie('studentToken', studentToken, { httpOnly: true }).redirect('/')
        }
        return res.render('student/login', { msg: 'invalid username' })
    } catch (error) {
        return res.render('student/login', { msg: 'unexpected error' })
    }
}

exports.getDashboardPage = async (req, res) => {
    var user = req.user.username
    const finder = await Student.findOne({ username: req.user.username })
    return res.render('student/dashboard', {user, finder})
}

exports.getExamPage = async (req, res) => {
    var user = req.user.username
    const questions = await Questions.find()
    return res.render('student/exam', {user, questions})
}

exports.exam = async (req, res) => {
    const finder = await Student.findOne({ username: req.user.username })
    finder.exam.push(req.body)
    await finder.save()
    return res.redirect('/')
}








exports.logout = (req, res) => {
    return res.clearCookie('studentToken').redirect('/login')
}