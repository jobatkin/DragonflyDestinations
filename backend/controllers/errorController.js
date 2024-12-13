const Models = require("../models");

// Get all submissions for a given form from the database
const getErrors = (req, res) => {
    const {code, type} = req.query;
    const options = {};
    if (code) options.code = code;
    if (type) options.type = type;

    Models.ErrorLog.findAll({where: options}).then((data) => {
        res.status(200).json({ result: `Error logs fetched successfully`, data: data });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message });
    })
}

// Add a new submission for a given form in the database
const addError = async (req, res) => {

    Models.ErrorLog.create(req.body).then((data) => {

        const error = data.get({plain:true});
        res.status(200).json({ result: `Error added to log successfully`, data: error });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message });
    })       
}

module.exports = {
    getErrors, addError
}