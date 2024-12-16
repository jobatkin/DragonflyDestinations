'use client'
import { useUserContext } from "@/context/UserContext";
import { Badge } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormFeedback from "./FormFeedback";
import { useState } from "react";
import FavouriteHelper from "@/utils/FavouriteHelper";
import LoggingHelper from "@/utils/LoggingHelper";
import APIHelper from "@/utils/APIHelper";

function CountryActions({code, favCount}: {code: string, favCount?: number}) {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [submitResult, setSubmitResult] = useState( {message: '', isError: false});
    const [count, setCount] = useState(favCount || 0);

    // only allow users to favourite and see others favourites if they're logged in
    if (!currentUser || !('token' in currentUser)) return null;

    const [isFavourite, listIndex] = FavouriteHelper.findFavourite(code, currentUser.lists);

    const handleToggleFavourite = async () => {
        let updatedFavourites = currentUser.lists[listIndex] ? [...currentUser.lists[listIndex].favourites] : [];
        let updatedList = currentUser.lists[listIndex] ? {...currentUser.lists[listIndex]} : {id:0,name:'',favourites:[]};

        // if this country is already a favourite, remove it, otherwise add it
        try {
            if (isFavourite) {
                const response = await APIHelper.deleteData(`/api/favourites/${isFavourite.id}`);
                updatedFavourites = updatedFavourites.filter(fav => fav.countryCode != code);
                updatedList.favourites = updatedFavourites;
                setCount(prevCount => prevCount - 1);
                setSubmitResult({message: response.result, isError: false});
            }
            else {
                const response = await APIHelper.postData(`/api/favourites/${currentUser.id}`, {type: 'favourite', countryCode: code});
                updatedFavourites = [...updatedFavourites, response.data];
                updatedList = {...updatedList, id: response.data.listId, name: response.data.listName, favourites: updatedFavourites};
                setCount(prevCount => prevCount + 1);
                setSubmitResult({message: response.result, isError: false});
            }
        } catch(err) {
            LoggingHelper.error(err as Error);
            setSubmitResult({message: `Could not save favourite: ${(err as Error).message}`, isError: true});
        }

        currentUser.lists[listIndex] = updatedList;
        handleUpdateUser(currentUser);
    }

    return (
        <>
            <Badge badgeContent={count.toString()} color="primary">
                { isFavourite ? 
                    <FavoriteIcon color="action" onClick={handleToggleFavourite} sx={{cursor: 'pointer'}}/> : 
                    <FavoriteBorderIcon color="action" onClick={handleToggleFavourite} sx={{cursor: 'pointer'}}/> }
            </Badge>
            <FormFeedback message={submitResult.message} isError={submitResult.isError} onClose={() => setSubmitResult({message: '', isError: false})}/>
        </>
    )
}

export default CountryActions;