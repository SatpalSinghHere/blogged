const User = require("../models/user")
const { getUserFromToken } = require("../services/auth")

function checkForAuthenticationToken(cookieName){
    return async (req, res, next) => {
        const userToken = req.cookies[cookieName]

        if(!userToken) return res.redirect('/user/signin')
    
        const userPayload = getUserFromToken(userToken)

        if(!userPayload) return res.redirect('/user/signin')

        const id = userPayload._id
               
        const user = await User.findOne({_id: id})        

        if(!user) return res.redirect('/user/signin')
    
        req.user = userPayload
        
        return next()
    }    
}

module.exports = {
    checkForAuthenticationToken
}