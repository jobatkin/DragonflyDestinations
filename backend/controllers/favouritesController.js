"use strict";
const Models = require("../models");

// Get all favourites for a given user from the database
const getFavourites = (req, res) => {
    const userId = req.params.uid;
    const options = { where: { userId: userId } }; 

    Models.Favourites.findAll(options).then(function (data) {
        res.status(200).json({ result: `Favourites data for user ${userId} fetched successfully`, data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

// Add a new favourite for a given user from the database
const addFavourite = async (req, res) => {
    const userId = req.params.uid;

    try {
        const user = await Models.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ result: "User not found, cannot add favourite" })
        }
        console.log(user)

        // record their favourite using special mixin method - https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
        const fav = await user.createFavourite(req.body);
        console.log(fav)
    } catch(err) {
        console.log(err)
        res.status(500).json({ result: err.message })
    }        
}

// update details for the given favourite and return the new favourite details
const updateFavourite = async (req, res) => {
    const favourite = {...req.body};
    // don't update any fields to an empty value
    for (let [key, value] in favourite) if (value.trim().length == 0) delete favourite[key];

    try {
        const [rowsUpdated] = await Models.Favourites.update(favourite, { where: { id: req.params.id } });
        if (rowsUpdated > 0) {
            const updatedFav = await Models.Favourites.findByPk(req.params.id)
            res.status(200).json({ result: 'Favourite updated successfully', data: updatedFav });
        }
        else {
            res.status(404).json({ result: `Favourite ${req.params.id} not found` });
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ result: err.message });
    }
}

// delete the favourite with the given id
const deleteFavourite = (req, res) => {
    Models.Favourites.destroy({
        where: { id: req.params.id }
    }).then(function (rowsDeleted) {
        // differentiate response if we DID find/delete a favourite or not
        rowsDeleted > 0 ? 
            res.status(200).json({ result: 'Favourite deleted successfully' }) :
            res.status(404).json({ result: `Favourite ${req.params.id} not found` })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ result: err.message })
    })
}

module.exports = {
    getFavourites, addFavourite, updateFavourite, deleteFavourite
}