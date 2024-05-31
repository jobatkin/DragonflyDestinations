"use strict";
const Models = require("../models");
const bcrypt = require('bcryptjs') // first run 'npm install bcryptjs'
const { createToken } = require('../middleware/auth');
const { Op } = require('sequelize');

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

// gets a count of the number of total and correct answers this user has given, broken down by question type
const getUserScores = async (req, res) => {
    const userId = req.params.uid;

    // get all answers recorded for this user
    try {
        const answersRight = await Models.Scores.count({
            where: {
                userId: userId,
                result: { [Op.gt]: 0 } // correct answers score greater than zero
            },
            attributes: ['question_type'],
            group: 'question_type' // group by the question type
        });
        const answersTotal = await Models.Scores.count({
            where: { userId: userId },
            attributes: ['question_type'],
            group: 'question_type' // group by the question type
        });   
        
        // combine correct and total answers into a single array
        const answers = answersTotal.map((answer, i) => ({question_type: answer.question_type, correct: answersRight[i].count, total: answer.count}));
        res.status(200).json({ result: 'User scores fetched successfully', data: answers })
        
    } catch(err) {
        console.log(err)
        res.status(500).json({ result: err.message })
    }
}

// records an answer for this user and returns the updated user including their latest current and high scores
const saveUserAnswer = async (req, res) => {
    const { question_type, result } = req.body;
    const userId = req.params.uid;

    try {
        const user = await Models.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ result: "User not found, cannot record score" })
        }
        console.log(user)

        // record their score using special mixin method - https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
        const scores = await user.createScore({question_type, result});
        console.log(scores)

        let scoreUpdates = { currentScore: 0 };
        if (result) {
            scoreUpdates = { currentScore: user.currentScore+1, highScore: user.currentScore+1 > user.highScore ? user.currentScore+1 : user.highScore }
        }
        const updatedUser = await user.update(scoreUpdates);

        res.status(200).json({ result: 'User scores updated successfully', data: updatedUser })

    } catch(err) {
        console.log(err)
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
            console.log(err)
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
        console.log(err)
        res.status(500).json({ result: err.message })
    })
}

module.exports = {
    loginUser, registerUser, updateUser, deleteUser, getUserScores, saveUserAnswer
}