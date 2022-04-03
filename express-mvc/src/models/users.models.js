

const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    type: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("user", userSchema)