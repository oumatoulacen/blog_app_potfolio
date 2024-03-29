const router = require('express').Router()
const User = require('../models/user.model.js')

const upload = require('../middlewares/upload.middleware.js')
const UserController = require('../controllers/UserController')
const PostController = require('../controllers/PostController')

// Create a new user
router.post('', UserController.create)

// Get all users
router.get('', UserController.find)

// Get a single user
router.get('/:id', UserController.findById)

// Update a user
router.put('/:id', UserController.update)

// Delete a user
router.delete('/:id', UserController.delete)

// get user posts
router.get('/:id/posts', PostController.findByUserId)

module.exports = router