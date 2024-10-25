const mongoose = require('mongoose');
const User = require('./user');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: '/images/defaultBlogImg.svg'
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    author: {
        type: String
    }
}, { timestamps: true })

blogSchema.pre('save', async function (req, res, next) {
    const user = await User.findById(this.authorId)

    this.author = user.fullName

    next()

})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog