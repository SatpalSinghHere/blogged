const {Router} = require('express')
const router = Router()
const path = require('path')
const multer = require('multer')

const Blog = require('../models/blog')

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
    
    return res.render('addBlog', {fullName: req.user.fullName})
})

router.post('/', upload.single('coverImage'), async (req, res) => {
    const {title, content} = req.body

    const blog = await Blog.create({
        title,
        content,
        author: req.user._id,
        coverImage: `/uploads/${req.file.filename}`
    })
    
    return res.redirect(`/blog/${blog._id}`)
})

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    return res.render('blog', {blog: blog, fullName: req.user.fullName})
})

module.exports = router