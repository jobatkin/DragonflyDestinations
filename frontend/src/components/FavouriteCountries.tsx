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
        <Grid container rowSpacing={2}>
            {favourites.map(fav => 
                <Grid item key={fav.id} xs={6} sm={4} md={3} lg={2}>
                    <SmallCountryCard code={fav.countryCode} name={fav.countryName} flagImg={fav.countryFlag} />
                </Grid>
            )}
        </Grid>
    )
}

export default FavouriteCountries