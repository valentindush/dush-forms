const express = require('express')
const { AuthRoute } = require('./routes/auth')
const app  = express()
const port  = process.env.PORT || 4000
const mongoose = require('mongoose')
const cors = require('cors')
const { formRouter } = require('./routes/form')
const { resultsRouter } = require('./routes/results')
app.use(express.json())
app.use(cors())


//Connecting to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/forms').then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB");
})

//Routes
app.use('/api/auth', AuthRoute)
app.use('/api/form', formRouter)
app.use('/api/results',resultsRouter)

//Starting the server
app.listen(port, ()=> console.log("Server up"))

