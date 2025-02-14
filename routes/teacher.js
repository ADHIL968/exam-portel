const express = require('express')
const router = express.Router()

const {cookie, cookieChecker} = require('../middleware/cookie')
const { getSignupPage, getLoginPage, signup, login, logout } = require('../controller/teacher/auth')
const { getDashboardPage, getCreateQuestionPage, createQuestion, getViewQuestionsPage, getCreateUserPage, createUser, getEvaluatePage, evaluate, result, getResultPage } = require('../controller/teacher/teacher')


router
    .route('/signup')
    .get(getSignupPage)
    .post(signup)

router
    .route('/login')
    .get(cookie, getLoginPage)
    .post(login)
router
    .route('/')
    .get(cookieChecker, getDashboardPage)
router
    .route('/createquestion')
    .get(cookieChecker, getCreateQuestionPage)
    .post(cookieChecker, createQuestion)
router
    .route('/viewquestions')
    .get(cookieChecker, getViewQuestionsPage)
router
    .route('/createuser')
    .get(cookieChecker, getCreateUserPage)
    .post(cookieChecker, createUser)
router
    .route('/evaluate')
    .get(cookieChecker, getEvaluatePage)
router
    .route('/evaluate/:id')
    .get(cookieChecker, evaluate)
router
    .route('/result/:id')
    .post(cookieChecker, result)
router
    .route('/viewresult')
    .get(cookieChecker, getResultPage)
router
    .route('/logout')
    .get(logout)

module.exports = router