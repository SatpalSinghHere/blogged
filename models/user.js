const mongoose = require('mongoose')
const { createHmac, randomBytes } = require('crypto')
const { setUserToken } = require('../services/auth')

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
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
    },
    profileImage : {
        type: String,
        default: '/images/defaultProfileImg.svg'
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

userSchema.static('matchPasswordandGenerateToken', async function(email, password){
    const user = await User.findOne({email})
    if(!user) return 
    const providedPassword = password

    const salt = user.salt
    const providedHashedPassword = createHmac('sha256', salt).update(providedPassword).digest('hex')
    

    const actualHashedPassword = user.password

    if(actualHashedPassword !== providedHashedPassword) return 

    
    return setUserToken(user)
})

const User = mongoose.model('User', userSchema);

module.exports = User