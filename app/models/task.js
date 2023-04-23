const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 2,
        max: 255
    },
    tags:{
        type: Array,
        require: false,
        default: []
    },
    datet:{
        type: Date,
        require: true
    },
    description:{
        type: String,
        require: false,
        max: 2000
    },
    idperson:{
        type: String,
        require: true        
    }
})

module.exports = mongoose.model('Task', taskSchema)