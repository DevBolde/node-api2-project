// implement your posts router here
const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

router.get('/', (req, res) => {
    Post.find()
        .then(found => {
            res.json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The posts information could not be retrieved',
                err: err.message,
                stack: err.stack,
            })
        })
})
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const post = await Post.findById(id)
        if(!post){
            res.status(404).json({
                message: `The post with the specified ${id} does not exist`
            })
        }else{
            res.json(post)
        }
    }catch(err){
        res.status(500).json({
            message: 'The post information could not be retrieved',
            err: err.message,
            stack: err.stack,
        })
    }
})
router.post('/', (req, res) => {
    const {title, contents} = req.body;
    if(!title || !contents){
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    }else{
        Post.insert({title, contents})
    .then(({id}) => {
        return Post.findById(id)
    })
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({
            message: 'The posts information could not be retrieved',
            err: err.message,
            stack: err.stack,
        })
    })
    }
    
})

router.delete('/:id', async (req, res) => {
    
    try{
        const {id} = req.params
        const post = await Post.findById(id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }else{
            await Post.remove(id)
            res.json(post)
        }
    }catch(err){
        res.status(500).json({
            message: 'The post could not be removed',
            err: err.message,
            stack: err.stack,
        })
    }
})
router.put('/:id', (req, res) => {
    const {id} = req.params
    const {title, contents} = req.body;
    if(!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }else{
        Post.findById(id)
        .then(stuff => {
            if(!stuff) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist',
                })
            }else{
                return Post.update(id, {title, contents})
            }
        })
        .then(data => {
            if(data){
                return Post.findById(id)
            }
        })
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The post information could not be modified',
                err: err.message,
                stack: err.stack,
            })
        })
    }
})
router.get('/:id/comments', async (req, res) => {
    try{
        const {id} = req.params
        const post = await Post.findById(id)
        if(!post){
            res.status(404).json({
                message: 'The post with the specified ID does not exist',
            })
        }else{
            const messages = await Post.findCommentById(id)
            res.json(messages)
        }
    }catch(err){
        res.status(500).json({
            message: 'The comments information could not be retrieved',
            err: err.message,
            stack: err.stack,
        })
    }
})

module.exports = router