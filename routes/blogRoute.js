const { Router } = require('express')
const router = Router()
const path = require('path')
const multer = require('multer')

const Blog = require('../models/blog')
const { findById } = require('../models/user')

//multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

router.get('/addBlog', (req, res) => {

  return res.render('addBlog', { fullName: req.user.fullName })
})

router.post('/', upload.single('coverImage'), async (req, res) => {
  const { title, content } = req.body
  let blog
  if (req.file) {
    blog = await Blog.create({
      title,
      content,
      authorId: req.user._id,
      coverImage: `/uploads/${req.file.filename}`
    })
  } else {
    blog = await Blog.create({
      title,
      content,
      authorId: req.user._id
    })
  }

  return res.redirect(`/blog/${blog._id}`)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  console.log(blog)
  return res.render('blog', { blog: blog, fullName: req.user.fullName })
})

router.get('/:id/edit', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  return res.render('editBlog', { blog: blog })
})

router.post('/:id/edit', upload.single('coverImage'), async (req, res) => {
  const {title, content} = req.body
  let blog
  if (req.file) {
    blog = await Blog.findByIdAndUpdate(req.params.id,{
      title,
      content,
      authorId: req.user._id,
      coverImage: `/uploads/${req.file.filename}`
    })
  } else {
    blog = await Blog.findByIdAndUpdate(req.params.id,{
      title,
      content,
      authorId: req.user._id
    })
  }

  return res.redirect(`/blog/${blog._id}`)
})

module.exports = router