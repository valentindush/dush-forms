const express = require('express')
const { AuthRoute } = require('./routes/auth')
const app  = express()
const port  = process.env.PORT || 4000
const mongoose = require('mongoose')
const cors = require('cors')
const { formRouter } = require('./routes/form')
app.use(express.json())
app.use(cors())



mongoose.connect('mongodb://localhost:27017/forms', ()=>console.log("db Connected"))
app.use('/api/auth', AuthRoute)
app.use('/api/form', formRouter)




app.listen(port, ()=> console.log("Server up"))

