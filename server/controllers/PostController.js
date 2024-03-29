const Post = require('../models/post.model')
const User = require('../models/user.model')
const upload = require('../middlewares/upload.middleware')
const fs = require('fs')
const path = require('path')

module.exports = {
    create: async (req, res) => {
        try {
            const { title, content, userId } = req.body
            if (!title || !content) {
                return res.status(400).json({ msg: 'All fields are required' })
            }
            
            if (!req.file) {
                return res.status(400).json({ msg: 'Please upload an image' })
            }
            const image = req.file.filename
            const newPost = new Post({
                title,
                content,
                image,
                user: userId
            })

            await newPost.save()
            res.json({ msg: 'Post created successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    find: async (req, res) => {
        try {
            const posts = await Post.find() //.populate('user', 'name email')
            res.json(posts)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    findById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate('user', 'name email')
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' })
            }
            res.json(post)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    findByUserId: function (req, res) {
        const userId = req.params.id
        Post.find({ user: userId })
            .then(posts => res.json(posts))
            .catch(err => res.status(400).json('Error: ' + err))
    },
    update: async (req, res) => {
        try {
            const { title, content, userId } = req.body
            console.log(req.body)
            const image = req.file.filename
            if (!image) {
                image = req.body.filename
            }
            if (!req.file && !image) {
                return res.status(400).json({ msg: 'Please upload an image' })
            }
            if (!title || !content) {
                return res.status(400).json({ msg: 'All fields are required' })
            }



            const post = await Post.findById(req.params.id)
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' })
            }

            await Post.findByIdAndUpdate(req.params.id, { title, body })
            res.json({ msg: 'Post updated successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' })
            }

            await Post.findByIdAndDelete(req.params.id)
            res.json({ msg: 'Post deleted successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    upload: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ msg: 'Please upload a file' })
            }

            const post = await Post.findById(req.params.id)
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' })
            }

            if (post.image) {
                fs.unlinkSync(path.join(__dirname, '../public', 'images', post.image))
            }

            await Post.findByIdAndUpdate(req.params.id, { image: req.file.filename })
            res.json({ msg: 'Image uploaded successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}
