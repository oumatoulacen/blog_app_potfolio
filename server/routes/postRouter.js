const router = require('express').Router()
const upload = require('../middlewares/upload.middleware.js')
const PostController = require('../controllers/PostController')

// Create a new post
router.post('', upload.single('image'), PostController.create)

// Get all posts
router.get('', PostController.find)

// Get a singl
router.get('/:postId', PostController.findById)

// Update a post
router.put('/:postId', upload.single('image'), PostController.update)

// Delete a post
router.delete('/:postId', PostController.delete)

// handle reads
router.put('/:postId/reads/:userId', PostController.reads)

// handle likes
router.put('/:postId/likes/:userId', PostController.likes)

// get the posts of a category
router.get('/categories/:category', PostController.findByCategory)

// get comments of a post
router.get('/:postId/comments', PostController.comments)
// set comments to a post
router.put('/:postId/comment', PostController.addComment)

module.exports = router