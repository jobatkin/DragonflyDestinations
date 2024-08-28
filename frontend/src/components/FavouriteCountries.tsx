import { UserFavourites } from "@/types";
import SmallCountryCard from "./SmallCountryCard"
import { Grid } from "@mui/material";

function FavouriteCountries({favourites}:{favourites: UserFavourites[]}) {
    console.log(favourites)
    return (
        <Grid container>
            {favourites.map(fav => 
                <Grid item key={fav.id}>
                    <SmallCountryCard code={fav.countryCode} name={fav.countryName} flagImg={fav.countryFlag} />
                </Grid>
            )}
        </Grid>
    )
}

export default FavouriteCountries