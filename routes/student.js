const express = require('express')
const router = express.Router()

const {cookie, cookieChecker} = require('../middleware/userCookie')
const { getLoginPage, login, getDashboardPage, logout, getExamPage, exam } = require('../controller/student/student')


router
    .route('/')
    .get(cookieChecker, getDashboardPage)
router
    .route('/login')
    .get(cookie, getLoginPage)
    .post(login)
router
    .route('/exam')
    .get(cookieChecker, getExamPage)
    .post(cookieChecker, exam)
router
    .route('/logout')
    .get(logout)


module.exports = router