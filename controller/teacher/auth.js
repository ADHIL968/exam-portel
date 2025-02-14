const Teacher = require('../../model/Teacher')
const createToken = require('../../utils/createToken')

exports.getSignupPage = (req, res) => {
    return res.render('teacher/signup', { msg: "" })
}

exports.getLoginPage = (req, res) => {
    return res.render('teacher/login', { msg: "" })
}


exports.signup = async (req, res) => {
    var signup = {
        username: req.body.username,
        password: req.body.password,
        id:Date.now()
    }
    try {
        const finder = await Teacher.findOne({ username: req.body.username })
        if (finder) {
            return res.render('teacher/signup', { msg: 'username already exists' })
        }
        await Teacher.create(signup)
        return res.render('teacher/signup', { msg: 'signed up' })
    } catch (error) {
        return res.render('teacher/signup', { msg: 'unexpected error' })
    }
}

exports.login = async (req, res) => {
    try {
        const finder = await Teacher.findOne({ username: req.body.username.toLowerCase() })
        if (finder) {
            const validate = await finder.validatePassword(req.body.password)
            if (!validate) {
                return res.render('teacher/login', { msg: 'incorrect password' })
            }
            const token = createToken(req.body.username)
            return res.cookie('token', token, { httpOnly: true }).redirect('/admin')
        }
        return res.render('teacher/login', { msg: 'invalid username' })
    } catch (error) {
        return res.render('teacher/login', { msg: 'unexpected error' })
    }
}


exports.logout = (req, res) => {
    return res.clearCookie('token').redirect('/admin/login')
}