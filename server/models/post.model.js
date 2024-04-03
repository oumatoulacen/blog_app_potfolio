const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            defaultValue: []
        }
    ],
    comments: [
        {
            text: String,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            },
            likes: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    defaultValue: []
                }
            ],
            replies: [
                {
                    text: String,
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now
                    },
                    updatedAt: {
                        type: Date,
                        default: Date.now
                    },
                    likes: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'User',
                            defaultValue: []
                        }
                    ]
                }
            ]
        }
    ],
    category: {
        type: String,
        default: 'others'
    },
    reads: {
        type: Number,
        default: 0
    }
  }, { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post