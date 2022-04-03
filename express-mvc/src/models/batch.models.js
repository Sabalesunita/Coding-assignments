

const mongoose = require('mongoose')

const batchSchema = new mongoose.Schema({
    BatchName: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("batch", batchSchema)