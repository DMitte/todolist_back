const mongoose = require('mongoose');

const cursosSchema = mongoose.Schema({
    nombre: {
        type: string,
        min: 6,
        max: 250
    },
    descripcion: {
        type: string
    }
})

module.exports = cursosSchema;