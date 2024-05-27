"use strict";
const Models = require("../models");
const bcrypt = require('bcryptjs') // first run 'npm install bcryptjs'
const { createToken } = require('../middleware/auth');

// creates a JWT token and encrypts the password
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const loginUser = async (req, res) => {
    try {
        // Get user input from request body
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).json({ result: "All input is required" });
            return; // when sending responses and finishing early, manually return or end the function to stop further processing
        }
        // Validate if user exists in our database
        const user = await Models.User.findOne({ raw: true, where: { email: email }});

        // if they do exist, make sure their password matches - need to check encrypted version of password
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token for use based on their id and email
            const token = createToken(user.id, email);
            // save user token
            user.token = token;

            console.log(user)

            // send back logged in user details including token
            res.status(200).json({ result: 'User successfully logged in', data: user });
        }
        else res.status(400).json({ result: "Invalid user credentials" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: err.message })
    }
}

// registers a new user by validating their details, encrypting their password, and generating a token
const registerUser = async (req, res) => {

    try {
        // Get user input by destructuring request body
        const { userName, email, password } = req.body;

        // Validate user input
        if (!(email && password && userName)) {
            res.status(400).json({ result: "All input is required"});
            return; // when sending responses and finishing early, manually return or end the function to stop further processing
        }

        // Validate if user exists in our database
        const oldUser = await Models.User.findOne({ where: { email }});

        if (oldUser) {
            res.status(409).json({ result: "User already exists. Please login" });
            return; // when sending responses and finishing early, manually return or end the function to stop further processing
        }

        let encryptedPassword = await bcrypt.hash(password, 10);
        const photo = req.file ? '/images/' + req.file.filename : null;

        // Create user in our database
        const userMetadata = await Models.User.create({
            userName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            profilePhoto: photo
        });
        const user = userMetadata.get({plain: true}) // get just the user fields, no extra sequelize metadata

        // Create token
        const token = createToken(user.id, email);

        // save user token to send back to front-end
        user.token = token;

        // return new user
        res.status(201).json({ result: "User successfully registered", data: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: err.message })
    }
}

const updateUser = (req, res) => {
    Models.User.update(req.body, { where: { id: req.params.id }, returning: true })
        // destructure returned data to get the updated user details
        .then(([rowsUpdated, [updatedUser]]) => {

            // differentiate response if we DID find/update a user or not
            rowsUpdated > 0 ? 
                res.status(200).json({ result: 'User updated successfully', data: updatedUser }) :
                res.status(404).json({ result: `User ${req.params.id} not found` })
        }).catch(err => {
            res.status(500).json({ result: err.message })
        })
}

const deleteUser = (req, res) => {
    Models.User.destroy({
        where: { id: req.params.id }
    }).then(function (rowsDeleted) {
        // differentiate response if we DID find/delete a user or not
        rowsDeleted > 0 ? 
            res.status(200).json({ result: 'User deleted successfully' }) :
            res.status(404).json({ result: `User ${req.params.id} not found` })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

// upload an image from a front-end form onto the back end server: https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/
const addProfileImage = (req, res) => {

    console.log(req.file) // saved filename is in req.file.filename
    const userUpdates = { profilePhoto: '/images/' + req.file.filename };
    console.log(userUpdates);

    // save path to uploaded file in DB for this user
    Models.User.update(
        userUpdates, 
        { where: { id: req.params.userId } }
    ).then(response => 
        res.status(200).json({ result: 'Image uploaded to profile successfully', data: userUpdates }) // send updated info back in response
    ).catch(err => 
        res.status(500).json({ result: err.message })
    )
}

module.exports = {
    loginUser, registerUser, updateUser, deleteUser, addProfileImage
}