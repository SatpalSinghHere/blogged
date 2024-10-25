const jwt = require('jsonwebtoken')

const secret = '$atpal'

function setUserToken (user) {
    return jwt.sign({
        _id : user._id,
        fullName: user.fullName,
        email: user.email, 
        profileImage : user.profileImage,
        role: user.role
    }, secret)
}

function getUserFromToken (token) {
    return jwt.verify(token, secret)
}

module.exports = {
    setUserToken,
    getUserFromToken
}