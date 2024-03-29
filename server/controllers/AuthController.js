const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Load User model
const User = require('../models/user.model.js')

const AuthController = {
    // Create a new user
    async register(req, res) {
        try {
            const {username, email, password, confirmPassword} = req.body
            console.log('body: ', req.body)
            if (!username || !email || !password || !confirmPassword) {
                console.log('All fields are required')
                return res.status(400).send('All fields are required')
            }
            if (password.length < 4) {
                console.log('Password must be at least 4 characters long')
                return res.status(400).send('Password must be at least 4 characters')
            }

            if (password !== confirmPassword) {
                console.log('Passwords do not match')
                return res.status(400).send('Passwords do not match')
            }

            const userExists = await User.findOne({ email })
            
            if (userExists) {
                console.log('User already exists')
                return res.status(400).send('User already exists')
            }
            
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({
                username,
                email,
                password: hashedPassword
            })
            await user.save()
            console.log('user: ', user)
            res.send(user)
        } catch (error) {
            console.log('error: ', error.message)
            res.status(500).send(error)
        }
    },
    // login a user
    async login(req, res) {
        const { email, password } = req.body
    
        if (!email || !password) {
            return res.status(400).send('Email and Password are required')
        }
        
        const user = await User.findOne({ email: email })
        
        if (!user) {
            return res.status(404).send('User not found')
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            return res.status(400).send('Invalid credentials')
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true })
        res.send(user)
    },
    // logout user
    async logout(req, res) {
        try {
            res.clearCookie('token')
            res.send('Logged out')
        } catch (error) {
            res.status(500).send(error)
        }
    },
}

module.exports = AuthController
