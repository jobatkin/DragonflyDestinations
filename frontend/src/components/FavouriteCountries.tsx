'use client'
import SmallCountryCard from "./SmallCountryCard"
import { Grid, Link } from "@mui/material";
import { useUserContext } from "@/context/UserContext";

function FavouriteCountries() {
    const {currentUser} = useUserContext();

    if (!currentUser || !('id' in currentUser)) return <p>Please <Link href="/login" variant="body2">login</Link> to view your dashboard.</p>;

    const favourites = currentUser.favourites;
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