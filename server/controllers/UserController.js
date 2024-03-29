const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model.js')

const UserController = {
    // Create a new user
    async create(req, res) {
        try {
            const {username, email, password, confirmPassword} = new User(req.body)

            if (!username || !email || !password || !confirmPassword) {
                return res.status(400).send('All fields are required')
            }
            if (password.length < 4) {
                return res.status(400).send('Password must be at least 4 characters')
            }

            if (password !== confirmPassword) {
                return res.status(400).send('Passwords do not match')
            }

            const userExists = await User.findOne({ email })

            if (userExists) {
                return res.status(400).send('User already exists')
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({
                username,
                email,
                password: hashedPassword
            })
            await user.save()
            res.send(user)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    // Get all users
    async find(req, res) {
        try {
            const users = await User.find()
            res.send(users)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    // Get a single user
    async findById(req, res) {
        try {
            const user = await User.findById(req.params.id)
            res.send(user)
        } catch (error) {
            res.status(500).send(error)
        }
    },
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    },
    // Update a user
    async update(req, res) {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body)
            res.send('User updated successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    },
    // Delete a user
    async delete(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.send('User deleted successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = UserController
