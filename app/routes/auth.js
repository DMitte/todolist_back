const router = require('express').Router();
const User = require('../models/users');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

//contraseña
const bcrypt = require('bcrypt');

//validation
const schemaRegister = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
    phone: Joi.number().required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})
router.post('/register', async (req,res) =>{
    //validate user
    const {err} = schemaRegister.validate(req.body);
    if(err) return res.status(400).json({error: true, msg: err.detail[0].message})

    //email exist
    const isEmailExist = await User.findOne({email: req.body.email});
    if(isEmailExist) return res.status(400).json({error: true, msg: 'Email ya registrado'})

    //hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    let numberphone = parseInt(req.body.phone);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: password,
        phone: numberphone
    });
    try{
        const saveUser = await user.save();
        res.json({
            error: null,
            data: saveUser
        })
    }catch (error){
        res.status(400).json({error});
    }
})

router.post('/login', async (req, res) =>{
    //Validaciones
    const {err} = schemaLogin.validate(req.body);
    if(err) return res.status(400).json({error: true, msg: err.details[0].message})

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({error: true, msg: 'Usuario no encontrado'})

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json({error: true, msg: 'Contraseña no valida'})
    //create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    },process.env.TOKEN_SECRET,{expiresIn: '1d'})

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
})

module.exports = router;
