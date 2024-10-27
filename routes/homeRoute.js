const {Router} = require('express')
const router = Router()

const User = require('../models/user')
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    blogs.reverse()
    console.log(blogs)
    return res.render('home', { blogs: blogs, fullName: req.user.fullName})
})

module.exports = router