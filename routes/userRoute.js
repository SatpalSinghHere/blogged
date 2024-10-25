const {Router} = require('express')
const router = Router()
const { createHmac } = require('crypto')

const User = require('../models/user')

router.get('/signup', (req, res) => {
    res.render('signup', {currentPath: '/user/signup'})
})
router.post('/signup', async (req, res) => {
    const {fullName, email, password} = req.body

    await User.create({
        fullName,
        email,
        password
    })

    res.redirect('/user/signin')

})


router.get('/signin', (req, res) => {
    res.render('signin', {currentPath: '/user/signin'})
})
router.post('/signin', async (req, res) => {
    const {email, password} = req.body

    const token = await User.matchPasswordandGenerateToken(email, password)

    if(!token) return res.render('signin', {currentPath: '/user/signin', message : "Email or password does not match"})
    
    
    res.cookie('token', token)
    return res.redirect('/home')

})

router.get('/signout', (req, res) => {
    res.clearCookie('token')
    return res.redirect('/user/signin')
})



module.exports = router