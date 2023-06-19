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

})
router.delete('/:id', (req, res) => {

})
router.put('/:id', (req, res) => {

})
router.get('/:id/messages', (req, res) => {

})

module.exports = router