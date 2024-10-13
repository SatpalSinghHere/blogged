const path = require('path')
const express = require('express')
const app = express()
const PORT = 8000
const { default: mongoose } = require('mongoose')

//Routes
const userRoute = require('./routes/userRoute')
const homeRoute = require('./routes/homeRoute')

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


app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use('/user', userRoute)
app.use('/home', homeRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})
