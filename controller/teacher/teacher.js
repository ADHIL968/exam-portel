const Question = require('../../model/Questions')
const Student = require('../../model/Student')

exports.getDashboardPage = (req, res) => {
    var user = req.user.username
    return res.render('teacher/dashboard', { user })
}

exports.getCreateQuestionPage = (req, res) => {
    var user = req.user.username
    return res.render('teacher/createquestion', { user })
}

exports.createQuestion = async (req, res) => {
    var user = req.user.username
    try {
        await Question.create({
            id: Date.now(),
            username: req.user.username,
            question: req.body.question
        })
        return res.redirect('/admin/createquestion')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/createquestion')
    }
}

exports.getViewQuestionsPage = async (req, res) => {
    var user = req.user.username
    try {
        const questions = await Question.find()
        return res.render('teacher/viewquestions', { user, questions })
    } catch (error) {
        return res.redirect('/admin/createquestion')
    }
}

exports.getCreateUserPage = (req, res) => {
    var user = req.user.username
    return res.render('teacher/createuser', { msg: "", user })
}

exports.createUser = async (req, res) => {
    var user = req.user.username
    const finder = await Student.findOne({ username: req.body.username })
    if (finder) {
        return res.render('teacher/createuser', { msg: "user already exist", user })
    }
    await Student.create({
        id: Date.now(),
        username: req.body.username,
        password: req.body.password
    })
    return res.render('teacher/createuser', { msg: "user created", user })
}

exports.getEvaluatePage = async (req, res) => {
    var user = req.user.username
    const students = await Student.find()
    return res.render('teacher/evaluate', {user, students})
}

exports.evaluate = async(req, res) => {
    var user = req.user.username
    const questions = await Question.find()
    const finder = await Student.findOne({ id: req.params.id })
    return res.render('teacher/evaluating', {user, finder, questions})
}

exports.result = async (req, res) => {
    const finder = await Student.findOne({ id: req.params.id })
    finder.result = req.body.result
    await finder.save()
    return res.redirect('/admin')
}

exports.getResultPage = async (req, res) => {
    var user = req.user.username
    const finder = await Student.find()
    return res.render('teacher/result', {user, finder})
}