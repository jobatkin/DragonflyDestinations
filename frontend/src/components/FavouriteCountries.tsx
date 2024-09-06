'use client'
import SmallCountryCard from "./SmallCountryCard"
import { Box, Grid, Link } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import FavouriteListControls from "./FavouriteListControls";

function FavouriteCountries() {
    const {currentUser} = useUserContext();

    if (!currentUser || !('id' in currentUser)) return <p>Please <Link href="/login" variant="body2">login</Link> to view your dashboard.</p>;
    
    return (
        <>
            {currentUser.lists.map(list => 
                <Box component="section" key={list.id} sx={{my: 2}}>
                    <FavouriteListControls listId={list.id} listName={list.name} />
                    <Grid container rowSpacing={2}>
                        {list.favourites.map(fav => 
                            <Grid item key={fav.id} xs={6} sm={4} md={3} lg={2}>
                                <SmallCountryCard code={fav.countryCode} name={fav.countryName} flagImg={fav.countryFlag} />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            )}
        </>
    )
}

export default FavouriteCountries