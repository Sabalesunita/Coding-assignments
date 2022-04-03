const express = require('express')

const router = express.Router()

const Submission = require('../models/submission.models')


router.get("/", async (req, res) => {
    try {
        const users = await Submission.find({}).lean().exec()
        res.status(201).send(users)
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const user = await Submission.create(req.body)
        return res.status(201).send(user)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

router.patch("/:id", async (req, res) => {
    try {
     
        const student = await Submission.update({ student_id: req.params.id }, { $set: { marks: req.body.marks } }, {
            new: true
        }).lean().exec()
        return res.status(201).send(student)
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const student = await Submission.findByIdAndDelete(req.params.id)
    }
    catch (err) {
        res.send({ message: err.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const students = await Submission.find({ evaluation_id: req.params.id }).populate("evaluation_id").populate("student_id").lean().exec()
        res.status(201).send(students)
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
})
router.get("/:id/evaluation", async (req, res) => {
    try {
        const students = await Submission.find({ evaluation_id: req.params.id }).populate("evaluation_id").populate({
            path: "student_user_id",
            select: ["roo_id", "student_user_id", "current_batch_id"],
            populate: [
                {
                    path: 'student_user_id',
                },
            ],
        }).sort({ marks: -1 }).limit(1).lean().exec()
        res.status(201).send(students)
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }
})


module.exports = router