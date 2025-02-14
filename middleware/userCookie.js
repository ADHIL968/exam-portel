const jwt = require('jsonwebtoken')

exports.cookieChecker = (req, res, next) => {
    const cookie = req.cookies?.studentToken
    try {
        const decoded = jwt.verify(cookie, process.env.PASSKEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.render('student/login', { msg: 'studentToken error' })
    }
}

exports.cookie = (req, res, next) => {
    const cookie = req.cookies?.studentToken
    if (!cookie) {
        next()
    } else {
        return res.redirect('/')
    }
}