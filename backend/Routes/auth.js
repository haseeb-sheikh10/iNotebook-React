const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');

const JWT_Secret = "This is iNotebook's backend";

// Route 1: Create a user using: POST api/auth/createUser. No Login Required.
router.post('/createUser',
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    async (req, res) => {

        //if there is error, return bad rquest and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            //check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            //if yes, through an error
            if (user) {
                return res.status(400).json({ error: "A user with this email already exist" });
            }

            //hashing password
            const salt = await bcrypt.genSalt(10);
            const safePass = await bcrypt.hash(req.body.password, salt);

            //if not exist already, create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: safePass
            })

            //generate an Authentication Token and return it as a response
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_Secret);
            res.json({ authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }
    }
);

// Route 2: Authenticate a user using: POST api/auth/loginUser. No Login Required.
router.post('/loginUser',
    body('email','Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    async (req, res) => {

        //if there is error, return bad rquest and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;
        try {

            //check whether user with this email exist or not 
            let user = await User.findOne({email});
            //if not, through an error
            if(!user)
            {
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }

            //if exist, compare the entered password
            const passCompare = await bcrypt.compare(password, user.password);
            //if do not match, through an error
            if(!passCompare)
            {
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }

            //if matched, generate an Authentication Token as a response 
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_Secret);
            res.json({ authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal error occured");
        }

    }
);

// Route 3: Get loggedIn user details using: POST api/auth/getUser. Login Required.
router.post('/getUser', fetchUser ,
    async (req, res) => {

        try {
            const userID = req.user.id;
            const user = await User.findById(userID).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal error occured");
        }
    }
);

module.exports = router;