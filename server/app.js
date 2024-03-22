const express = require('express')
const mongoose = require('mongoose')


// load env variables
require('dotenv').config()

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to the database')
    })
    .catch((err) => {
        console.log('Error connecting to the database', err)
    })


// Create an express app
const app = express()

// Use middlewares

// register routes

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})