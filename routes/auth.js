const router = require('express').Router();
const User = require('../model/usermodel');
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
router.post('/register', async(req, res) => {

    //Validation
    const{ error } = registerValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    //checking if a user already exists in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    
    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err) {
        res.status(400).send(err);
    }
});
    //LOGIN

    router.post('/login', async (req, res) => {
        const { error } = loginValidation(req.body);
        if(error)return res.status(400).send(error.details[0].message);
        
        //checking if user is already logged in
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send("Email doesn't exists");
        
        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid Password');

        //create and assign a token
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
        
    });

module.exports = router;