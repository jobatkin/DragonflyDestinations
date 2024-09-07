'use client'
import SmallCountryCard from "./SmallCountryCard"
import { Box, Grid, Link, Typography } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import FavouriteListControls from "./FavouriteListControls";
import { useRef, useState } from "react";
import { UserFavourite } from "@/types";
import { PanInfo } from "framer-motion";

function FavouriteCountries() {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [draggedItem, setDraggedItem] = useState<{ country: UserFavourite, listIndex: number } | null>(null);
    const constraintsRef = useRef(null);
    const dropZoneRefs = useRef<(HTMLDivElement | null)[]>([]);

    if (!currentUser || !('id' in currentUser)) return <p>Please <Link href="/login" variant="body2">login</Link> to view your dashboard.</p>;

    const handleDragStart = (country: UserFavourite, listIndex: number) => {
        setDraggedItem({ country, listIndex });
        console.log(`dragging ${country.countryName} from list ${listIndex}`)
    };

    const handleDrop = (event: MouseEvent | TouchEvent | null, info: PanInfo) => {
        console.log(`dropped ${draggedItem?.country.countryName}`)
        if (draggedItem) {
            const { country, listIndex } = draggedItem;
            let oldFavouriteLists = [...currentUser.lists];

            let listIndexTarget = -1;
            const { x: finalX, y: finalY } = info.point;
            const { scrollX, scrollY } = window; // Get the scroll offsets

            console.log(`drop position ${finalX} ${finalY}`)

            // Adjust coordinates for scroll offset
            const adjustedX = finalX - scrollX;
            const adjustedY = finalY - scrollY;
            console.log(`drop position with scroll offsets ${adjustedX} ${adjustedY}`)

            // Check which drop zone the item was dropped in
            dropZoneRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    console.log(`drop zone #${index}: l = ${rect.left} r = ${rect.right} t = ${rect.top} b = ${rect.bottom}`)

                    // Adjust the conditions to allow for partial overlaps
                    const isWithinX = adjustedX >= rect.left && adjustedX <= rect.right;
                    const isWithinY = adjustedY >= rect.top && adjustedY <= rect.bottom;
        
                    // Check if any part of the item is within the drop zone
                    if (isWithinX && isWithinY) {
                        listIndexTarget = index;
                    }
                }
            });
            console.log(`dropping ${draggedItem?.country.countryName} into new list ${listIndexTarget}`)

            if (listIndexTarget >= 0 && listIndex !== listIndexTarget) {
                // remove dragged country from old favourite list
                currentUser.lists[listIndex].favourites = oldFavouriteLists[listIndex].favourites.filter(fav => fav.id != country.id);
                // add dragged country to new list
                currentUser.lists[listIndexTarget].favourites = [...oldFavouriteLists[listIndexTarget].favourites, country];
                
                handleUpdateUser(currentUser);
            }
        }
        setDraggedItem(null);
    };    

    const favouritesGrid = (favourites: UserFavourite[], listIndex: number) => (
        favourites.map(fav => 
            <Grid item key={fav.id} xs={6} sm={4} md={3} lg={2} >
                <SmallCountryCard code={fav.countryCode} name={fav.countryName} flagImg={fav.countryFlag} 
                    onDrag={() => handleDragStart(fav, listIndex)} dragConstraints={constraintsRef}
                    onDragEnd={handleDrop}/>
            </Grid>
        )
    )

    return (
        <Box component="div" sx={{my: 4}} ref={constraintsRef}>
            {currentUser.lists.map((list, index) => 
                <Box component="section" key={list.id} sx={{my: 4}} >
                    <FavouriteListControls listId={list.id} listName={list.name} isFirst={index == 0}/>
                    {list.favourites.length > 0 ?
                        <Grid container rowSpacing={2} ref={(el:HTMLDivElement) => {dropZoneRefs.current[index] = el}}>
                            { favouritesGrid(list.favourites, index) } 
                        </Grid> : 
                        <Box sx={{minHeight:'80px', width: '100%', border: '1px solid #252b48', p: 1, my: 2 }} ref={(el:HTMLDivElement) => {dropZoneRefs.current[index] = el}}>
                            <Typography variant="body2">Drag some favourite countries from the above lists to get started on your new list!</Typography>
                        </Box>
                    }
                </Box>
            )}
        </Box>
    )
}

export default FavouriteCountries