const {Router} = require('express')
const router = Router()

const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router