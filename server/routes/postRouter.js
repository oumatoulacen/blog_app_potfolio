const router = require('express').Router()
const Post = require('../models/post.model')
const upload = require('../middlewares/upload.middleware.js')
const PostController = require('../controllers/PostController')

// Create a new post
router.post('', upload.single('image'), PostController.create)

// Get all posts
router.get('', PostController.find)

// Get a singl
router.get('/:id', PostController.findById)

// Update a post
router.put('/:id', PostController.update)

// Delete a post
router.delete('/:id', PostController.delete)

module.exports = router