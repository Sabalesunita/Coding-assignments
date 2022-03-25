
const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/authenticate");

const Post = require("../models/post.model")

router.post("", authenticate, async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const post = await Post.create(req.body)
        return res.status(200).send(post)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

router.get("", async (req, res) => {
    try{
        const post = await Post.find()
        return res.status(200).send(post)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

module.exports = router;