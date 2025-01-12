const Models = require("../models");

// Get all submissions for a given form from the database
const getSubmissions = (req, res) => {
    const formName = req.params.form;
    const options = { where: {form: formName} };

    Models.Submission.findAll(options).then((data) => {
        res.status(200).json({ result: `Submissions for form ${formName} fetched successfully`, data: data });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message });
    })
}

// Add a new submission for a given form in the database
const addSubmission = async (req, res) => {

    Models.Submission.create(req.body).then((data) => {

        const submission = data.get({plain:true});
        res.status(200).json({ result: `Submission added successfully`, data: submission });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message });
    })       
}

// update details for the given submission and return the new submission details
const updateSubmission = async (req, res) => {
    const submissionId = req.params.id;
    const submission = {...req.body};
    // don't update any fields to an empty value
    for (let [key, value] in submission) if (value.trim().length == 0) delete submission[key];

    try {
        const [rowsUpdated] = await Models.Submission.update(submission, { where: { id: submissionId } });
        if (rowsUpdated > 0) {
            const updatedSubmission = await Models.Submission.findByPk(submissionId);
            return res.status(200).json({ result: 'Submission updated successfully', data: updatedSubmission });
        }

        return res.status(404).json({ result: `Submission ${submissionId} not found` });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ result: err.message });
    }
}

// delete the submission with the given id
const deleteSubmission = (req, res) => {
    Models.Submission.destroy({
        where: { id: req.params.id }
    }).then(function (rowsDeleted) {
        // differentiate response if we DID find/delete a submission or not
        return rowsDeleted > 0 ? 
            res.status(200).json({ result: 'Submission deleted successfully', data: req.params }) :
            res.status(404).json({ result: `Submission ${req.params.id} not found` })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({ result: err.message })
    })
}

module.exports = {
    getSubmissions, addSubmission, updateSubmission, deleteSubmission
}