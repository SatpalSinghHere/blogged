const {Router} = require('express')
const router = Router()

const User = require('../models/user')

router.get('/signup', (req, res) => {
    res.render('signup')
})

module.exports = router