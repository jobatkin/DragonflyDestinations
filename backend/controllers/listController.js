const Models = require("../models");
const { includeFavouriteCountries } = require("./favouritesController");

// Get all lists for a given user from the database
const getLists = (req, res) => {
    const userId = req.params.uid;
    const options = { 
        include: [{
            model: Models.Favourite,
            include: [...includeFavouriteCountries]
        }],
        where: { userId: userId },
    }; 

    console.log(options);

    Models.List.findAll(options).then(function (data) {
        // flatten favourites for ease of use in front end
         const lists = data.map(list => {
            const plainList = list.get({ plain: true });
             return {
                ...plainList,
                favourites: plainList.favourites.map(favourite => ({
                    id: favourite.id, 
                    countryCode: favourite.countryCode, 
                    countryName: favourite.country.name, 
                    countryFlag: favourite.country.flag.svgLink
                }))
            }
        });       

        res.status(200).json({ result: `Lists data for user ${userId} fetched successfully`, data: lists });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ result: err.message });
    })
}

// Add a new list for a given user in the database
const addList = async (req, res) => {
    const userId = req.params.uid;

    try {
        const user = await Models.User.findByPk(userId);

        if (!user) {
            res.status(404).json({ result: "User not found, cannot add favourite" }); return;
        }
        console.log(user)

        // create their list using special mixin method - https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
        const listInstance = await user.createList(req.body);

        res.status(200).json({ result: `List added successfully`, data: listInstance });
    } catch(err) {
        console.log(err)
        res.status(500).json({ result: err.message })
    }        
}

// update details for the given list and return the new list details
const updateList = async (req, res) => {
    const listId = req.params.lid;
    const list = {...req.body};
    // don't update any fields to an empty value
    for (let [key, value] in list) if (value.trim().length == 0) delete list[key];

    try {
        const [rowsUpdated] = await Models.List.update(list, { where: { id: listId } });
        if (rowsUpdated > 0) {
            const updatedList = await Models.List.findByPk(listId);
            res.status(200).json({ result: 'List updated successfully', data: updatedList });
        }
        else {
            res.status(404).json({ result: `List ${listId} not found` });
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ result: err.message });
    }
}

// delete the list with the given id
const deleteList = (req, res) => {
    Models.List.destroy({
        where: { id: req.params.lid }
    }).then(function (rowsDeleted) {
        // differentiate response if we DID find/delete a favourite or not
        rowsDeleted > 0 ? 
            res.status(200).json({ result: 'List deleted successfully' }) :
            res.status(404).json({ result: `List ${req.params.lid} not found` })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ result: err.message })
    })
}

module.exports = {
    getLists, addList, updateList, deleteList
}