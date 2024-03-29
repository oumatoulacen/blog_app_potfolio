const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// require middlewares
const upload = require('./middlewares/upload.middleware.js')
const authCookies = require('./middlewares/authCookies.middleware.js')

// require routes
const userRouter = require('./routes/userRouter.js')
const postRouter = require('./routes/postRouter.js')
const authRouter = require('./routes/authRouter.js')

// require models
const User = require('./models/user.model.js')
const Post = require('./models/post.model.js')

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

// Set the view engine
app.set('view engine', 'ejs')

// Use middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))
app.use(cors())


// register routes
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/auth', authRouter)

// define endpoints
app.get('/', authCookies, function (req, res) {
    res.send(`Hello ${req.user ? req.user.username : 'Guest'}`)
})

app.get('/upload', (req, res) => {
    res.render('upload')
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully')
})


// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
