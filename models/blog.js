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

blogSchema.pre('save', async function () {
    if (this.isNew) { // Only fetch authorName on new document creation
        try {
            const author = await User.findById(this.authorId);
            if (author) {
                this.author = author.fullName;
                console.log('author Name added : ',author.fullName ) // Assuming `username` is the field in User schema
            } else {
                throw new Error('Author not found');
            }
        } catch (error) {
            throw new Error ('Author not found');
        }
    }
    

})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog