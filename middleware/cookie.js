const jwt = require('jsonwebtoken')

exports.cookieChecker = (req, res, next) => {
    const cookie = req.cookies?.token
    try {
        const decoded = jwt.verify(cookie, process.env.PASSKEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.render('teacher/login', { msg: 'token error' })
    }
}

exports.cookie = (req, res, next) => {
    const cookie = req.cookies?.token
    if (!cookie) {
        next()
    } else {
        return res.redirect('/admin')
    }
}