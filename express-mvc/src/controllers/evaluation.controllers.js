const express = require('express')
const router = express.Router()

const Evaluation = require('../models/evaluation.models')

router.get("/", async (req, res) => {
    try {
        const users = await Evaluation.find({}).lean().exec()
        res.status(201).send(users)
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
})

//   **************** it is the post method *************************//
router.post("/", async (req, res) => {
    try {
        const user = await Evaluation.create(req.body)
        return res.status(201).send(user)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})


module.exports = router