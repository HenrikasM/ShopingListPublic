const express = require('express');
const { findById } = require('../../models/User');
const router = express.Router();
const bcrypt =require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

const User = require('../../models/User');

router.post('/', (req, res) => {
    const {email, password} = req.body;
 
    //validation
    if(!email || !password) {
     return res.status(400).json({msg: 'Please enetel all fields'});
    }
 
    //check for existing user
    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg:'User doesnt exist'});

    //validate password
    bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({
                msg: ' Invalid password'
            });

            jwt.sign(
                { id:user.id },
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user:{
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }})
                   });
        })
    })
 });
 //get req api/auth/user

 router.get('/user', auth, (req,res) => {
     User.findById(req.user.id)
     .select('-password')
     .then(user => res.json(user));
 });
 
 module.exports = router;