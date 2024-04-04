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
        res.send({ user, token })
    },
    // Update a user with the given credentials and update the avatar to match the given file
    async update(req, res) {
        try {
            let avatar = 'avatar.png';
            const { username, email } = req.body;
            if (req.file) {
                avatar = req.file.filename
            }
            if (!username || !email) {
                return res.status(400).send('All fields are required')
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            await User.findByIdAndUpdate(req.params.id, {
                username,
                email,
                password: hashedPassword,
                avatar
            })
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
    },
    // Follow a user
    async follow(req, res) {
        try {
            const { activeUserId, userId } = req.body
            if (activeUserId === userId) {
                return res.status(400).send('You cannot follow yourself')
            }
            let user = await User.findById(userId)
            const activeUser = await User.findById(activeUserId)
            if (!user.followers.includes(activeUserId)) {
                await user.updateOne({ $push: { followers: activeUserId } })
                await activeUser.updateOne({ $push: { following: userId } })
                console.log(`${activeUser.username} is following ${user.username} now`)
                // get the updated user
                user = await User.findById(userId)
                res.send(user)
            } else {
                res.status(400).send('You already follow this user')
            }
        } catch (err) {
            res.status(500).send({error : err.message})
        }
    },
    // Unfollow a user
    async unfollow(req, res) {
        try {
            const { activeUserId, userId } = req.body
            if (activeUserId === userId) {
                return res.status(400).send('You cannot unfollow yourself')
            }
            let user = await User.findById(userId)
            const activeUser = await User.findById(activeUserId)
            if (user.followers.includes(activeUserId)) {
                await user.updateOne({ $pull: { followers: activeUserId } })
                await activeUser.updateOne({ $pull: { following: userId } })
                console.log(`${activeUser.username} unfollowed ${user.username}`)
                // get the updated user
                user = await User.findById(userId)
                res.send(user)
            } else {
                res.status(400).send('You do not follow this user')
            }
        } catch (err) {
            res.status(500).send({error : err.message})
        }
    }

}

module.exports = UserController
