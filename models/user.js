const mongoose = require('mongoose')
const { createHmac, randomBytes } = require('crypto')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,        
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) return next()

    const salt = 'someRandomSalt'

    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')

    user.password = hashedPassword
    user.salt = salt
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User