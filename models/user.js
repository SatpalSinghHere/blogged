const { Schema } = require('mongoose')
const { createHmac, randomBytes } = require('crypto')

const userSchema = new Schema({
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
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) return next()

    const salt = randomBytes(16).toString()

    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')

    user.password = hashedPassword
    user.salt = salt
})

module.exports = userSchema