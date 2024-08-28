'use client'
import { useUserContext } from "@/context/UserContext";
import { Badge } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import FormFeedback from "./FormFeedback";
import { useState } from "react";

function CountryActions({code}: {code: string}) {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [submitResult, setSubmitResult] = useState( {message: '', isError: false});

    // only allow users to favourite and see others favourites if they're logged in
    if (!currentUser || !('id' in currentUser)) return null;

    const isFavourite = currentUser.favourites.find(fav => fav.countryCode == code);

    const handleToggleFavourite = async () => {
        let updatedFavourites = [...currentUser.favourites];

        // if this country is already a favourite, remove it, otherwise add it
        try {
            if (isFavourite) {
                const response = await axios.delete(`/api/favourites/${isFavourite.id}`);
                updatedFavourites = currentUser.favourites.filter(fav => fav.countryCode != code);
                setSubmitResult({message: response.data.result, isError: false});
            }
            else {
                const response = await axios.post(`/api/favourites/${currentUser.id}`, {type: 'favourite', countryCode: code});
                updatedFavourites = [...updatedFavourites, response.data.data];
                setSubmitResult({message: response.data.result, isError: false});
            }
        } catch(err) {
            console.log(err);
            setSubmitResult({message: `Could not save favourite: ${(err as Error).message}`, isError: true});
        }

        currentUser.favourites = updatedFavourites;
        handleUpdateUser(currentUser);
    }

    return (
        <>
            <Badge badgeContent={4} color="primary">
                { isFavourite ? <FavoriteIcon color="action" onClick={handleToggleFavourite}/> : <FavoriteBorderIcon color="action" onClick={handleToggleFavourite}/> }
            </Badge>
            <FormFeedback message={submitResult.message} isError={submitResult.isError} onClose={() => setSubmitResult({message: '', isError: false})}/>
        </>
    )
}

export default CountryActions;