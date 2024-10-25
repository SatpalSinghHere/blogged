const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 8000
const { default: mongoose } = require('mongoose')

//Routes
const userRoute = require('./routes/userRoute')
const homeRoute = require('./routes/homeRoute')
const blogRoute = require('./routes/blogRoute')
const { checkForAuthenticationToken } = require('./middlewares/checkCookieToken')

//connecting mongodb
mongoose.connect('mongodb://localhost:29000/blogged')
    .then(()=>{
        console.log('Connected to mongodb')
    })
    .catch((err)=>{
        console.log(err)
    })

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))


app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use('/user', userRoute)
app.use('/blog', checkForAuthenticationToken('token'), blogRoute)
app.use('/home', checkForAuthenticationToken('token'), homeRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})
