'use client'
import { useUserContext } from "@/context/UserContext";
import { Badge } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import FormFeedback from "./FormFeedback";
import { useState } from "react";
import FavouriteHelper from "@/utils/FavouriteHelper";
import LoggingHelper from "@/utils/LoggingHelper";

function CountryActions({code, favCount}: {code: string, favCount?: number}) {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [submitResult, setSubmitResult] = useState( {message: '', isError: false});
    const [count, setCount] = useState(favCount || 0);

    // only allow users to favourite and see others favourites if they're logged in
    if (!currentUser || !('token' in currentUser)) return null;

    //const isFavourite = currentUser.favourites.find(fav => fav.countryCode == code);
    const [isFavourite, listIndex] = FavouriteHelper.findFavourite(code, currentUser.lists);

    const handleToggleFavourite = async () => {
        let updatedFavourites = [...currentUser.lists[listIndex].favourites];

        // if this country is already a favourite, remove it, otherwise add it
        try {
            if (isFavourite) {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_SERVER}/api/favourites/${isFavourite.id}`);
                updatedFavourites = updatedFavourites.filter(fav => fav.countryCode != code);
                setCount(prevCount => prevCount - 1)
                setSubmitResult({message: response.data.result, isError: false});
            }
            else {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/api/favourites/${currentUser.id}`, {type: 'favourite', countryCode: code});
                updatedFavourites = [...updatedFavourites, response.data.data];
                setCount(prevCount => prevCount + 1)
                setSubmitResult({message: response.data.result, isError: false});
            }
        } catch(err) {
            LoggingHelper.error(err as Error);
            setSubmitResult({message: `Could not save favourite: ${(err as Error).message}`, isError: true});
        }

        currentUser.lists[listIndex].favourites = updatedFavourites;
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