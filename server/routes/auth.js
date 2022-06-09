const {login, login_home, register } = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.post('/signup', register)
router.post('/login', login)
router.post('/loginhome', login_home)

module.exports.AuthRoute = router