"use strict";
const Models = require("../models");

const includeFavouriteCountries = [{ 
    model: Models.Country, 
    attributes: ['name'], 
    include: [{ model: Models.Flag, attributes: ['pngLink'] }] 
}];

// Get all favourites for a given user from the database
const getFavourites = (req, res) => {
    const userId = req.params.uid;
    const options = { where: { userId: userId }, include: includeFavouriteCountries }; 

    Models.Favourite.findAll(options).then(function (data) {
        // flatten favourites for ease of use in front end
        const favourites = data.map(favourite => ({
            id: favourite.id, 
            type: favourite.type, 
            countryCode: favourite.countryCode, 
            countryName: favourite.country.name, 
            countryFlag: favourite.country.flag.pngLink
        }));        

        res.status(200).json({ result: `Favourites data for user ${userId} fetched successfully`, data: favourites });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message });
    })
}

// Add a new favourite for a given user from the database
const addFavourite = async (req, res) => {
    const userId = req.params.uid;

    try {
        const user = await Models.User.findByPk(userId);
        const country = await Models.Country.findByPk(req.body.countryCode, {include: Models.Flag});

        if (!user) {
            res.status(404).json({ result: "User not found, cannot add favourite" }); return;
        }
        console.log(user)

        if (!country) {
            res.status(404).json({ result: "Country not found, cannot add favourite" }); return;
        }

        // record their favourite using special mixin method - https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
        const favInstance = await user.createFavourite({...req.body, userId});
        const fav = favInstance ? favInstance.get({ plain: true }) : null;
        fav.countryName = country.toJSON().name;
        fav.countryFlag = country.toJSON().flag.pngLink;

        console.log(fav)
        res.status(200).json({ result: `Favourite added successfully`, data: fav });
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
        const [rowsUpdated] = await Models.Favourite.update(favourite, { where: { id: req.params.fid } });
        if (rowsUpdated > 0) {
            const updatedFav = await Models.Favourite.findByPk(req.params.fid)
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
    Models.Favourite.destroy({
        where: { id: req.params.fid }
    }).then(function (rowsDeleted) {
        // differentiate response if we DID find/delete a favourite or not
        rowsDeleted > 0 ? 
            res.status(200).json({ result: 'Favourite deleted successfully' }) :
            res.status(404).json({ result: `Favourite ${req.params.fid} not found` })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ result: err.message })
    })
}

module.exports = {
    getFavourites, addFavourite, updateFavourite, deleteFavourite, includeFavouriteCountries
}