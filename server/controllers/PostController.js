const Post = require('../models/post.model')
const User = require('../models/user.model')
const upload = require('../middlewares/upload.middleware')
const fs = require('fs')
const path = require('path')

module.exports = {
    create: async (req, res) => {
        try {
            const { title, content, category, userId } = req.body
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
                userId,
                category
            })

            await newPost.save()
            res.json({ msg: 'Post created successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    find: async (req, res) => {
        try {
            const posts = await Post.find().populate('userId', 'username avatar email')
            res.json(posts)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    findById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId).populate('userId', 'username avatar email')
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' })
            }
            res.json(post)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    findByUserId: async (req, res) => {
        try {
            const userId = req.params.id
            const posts = await Post.find({ userId: userId }).populate('userId', 'username avatar email')
            res.json(posts)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    update: async (req, res) => {
        try {
            let image;
            const { title, content } = req.body;
            if (req.file) {
                image = req.file.filename
            }
            if (!title || !content) {
                return res.status(400).json({ msg: 'All fields are required' })
            }

            const post = await Post.findById(req.params.id)
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' })
            }
            const postUpdate = image ? { title, content, image } : { title, content }

            await Post.findByIdAndUpdate(req.params.id, postUpdate, { new: true})
            
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
    // get all posts of a category
    findByCategory: async (req, res) => {
        try {
            const category = req.params.category
            const posts = await Post.find({ category: category }).populate('userId', 'username avatar email')
            res.json(posts)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    // increment reads
    reads: async (req, res) => {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        post.reads += 1;
        await post.save();
        res.json(post);
    },
    likes: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.params.userId;

            let post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }
            // check if likes has userId to remove it if not add it
            if (post.likes.includes(userId)) {
                await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
            } else {
                post.likes.push(userId);
            }
            await post.save();
            post = await Post.findById(postId);
            res.json(post);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    // get comments of a post
    comments: async (req, res) => {
        try {
            const postId = req.params.postId;
            const post = await Post.findById(postId).populate('comments.userId', 'username avatar email');
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }
            res.json(post.comments);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
    ,
    // set comments to a post
    addComment: async (req, res) => {
        try {
            const postId = req.params.postId;
            const { text, userId } = req.body;
            if (!text) {
                return res.status(400).json({ msg: 'Comment is required' });
            }
            let post = await Post.findById(postId)
            console.log('post: ',post);
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }
            post.comments.push({ text, userId });
            await post.save();
            post = await Post.findById(postId).populate('comments.userId', 'username avatar email');
            res.json(post.comments);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}