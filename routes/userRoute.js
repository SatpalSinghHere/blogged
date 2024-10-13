const {Router} = require('express')
const router = Router()
const { createHmac } = require('crypto')

const User = require('../models/user')

router.get('/signup', (req, res) => {
    res.render('signup')
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
    res.render('signin', {message: 'undefined'})
})
router.post('/signin', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user) return res.render('signin', {message : "This email does not exist"})

    const providedPassword = password

    const salt = user.salt
    const providedHashedPassword = createHmac('sha256', salt).update(providedPassword).digest('hex')
    console.log(providedHashedPassword)

    const actualHashedPassword = user.password

    if(actualHashedPassword !== providedHashedPassword) return res.render('signin', {message : "Password is incorrect"})

    return res.redirect('/home')

})



module.exports = router