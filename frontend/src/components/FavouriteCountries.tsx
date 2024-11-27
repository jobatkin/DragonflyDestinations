'use client'
import SmallCountryCard from "./SmallCountryCard"
import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import FavouriteListControls from "./FavouriteListControls";
import { MutableRefObject, useRef, useState } from "react";
import { UserFavourite } from "@/types";
import { PanInfo } from "framer-motion";

// figure out which of the favourite lists the active dragged country is currently in
function getDragListTarget(info: PanInfo, dropZoneRefs: MutableRefObject<(HTMLDivElement | null)[]>) {
    const { x: finalX, y: finalY } = info.point;
    const { scrollX, scrollY } = window; // Get the scroll offsets
    const verticalOverlap = 40; // number of pixels dragged item can stick out of drop area vertically

    let listIndexTarget = -1;

    // Adjust coordinates for scroll offset
    const adjustedX = finalX - scrollX;
    const adjustedY = finalY - scrollY;
    LoggingHelper.log(`drop position with scroll offsets ${adjustedX} ${adjustedY}`)    

    // Check which drop zone the item was dropped in
    dropZoneRefs.current.forEach((ref, index) => {
        if (ref) {
            const rect = ref.getBoundingClientRect();
            LoggingHelper.log(`drop zone #${index}: l = ${rect.left} r = ${rect.right} t = ${rect.top - verticalOverlap} b = ${rect.bottom + verticalOverlap}`)

            // Adjust the conditions to allow for partial overlaps
            const isWithinX = adjustedX >= rect.left && adjustedX <= rect.right;
            const isWithinY = adjustedY >= (rect.top - verticalOverlap) && adjustedY <= (rect.bottom + verticalOverlap);

            // Check if any part of the item is within the drop zone
            if (isWithinX && isWithinY) {
                listIndexTarget = index;
            }
        }
    });    
    return listIndexTarget;
}

function FavouriteCountries() {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [draggedItem, setDraggedItem] = useState<{ country: UserFavourite, listIndex: number } | null>(null);
    const [dropArea, setDropArea] = useState(-1);
    const constraintsRef = useRef(null);
    const dropZoneRefs = useRef<(HTMLDivElement | null)[]>([]);
    const theme = useTheme();

    if (!currentUser || !('id' in currentUser)) return <p>Please <Link href="/login" variant="body2">login</Link> to view your dashboard.</p>;

    // when we start dragging a country, set it in state to remember it
    const handleDragStart = (country: UserFavourite, listIndex: number) => {
        setDraggedItem({ country, listIndex });
    };

    // when the drag location changes, save it in state so we can change the background colour
    const handleDrag = (event: MouseEvent | TouchEvent | null, info: PanInfo) => {
        let listIndexTarget = getDragListTarget(info, dropZoneRefs);
        setDropArea(listIndexTarget);
    };    

    // when the dragged country is dropped, remove it from the old list and add it to the new
    const handleDrop = (event: MouseEvent | TouchEvent | null, info: PanInfo) => {
        if (draggedItem) {
            const { country, listIndex } = draggedItem;
            const updatedFavouriteLists = [...currentUser.lists];

            let listIndexTarget = getDragListTarget(info, dropZoneRefs);
            LoggingHelper.log(`dropping ${draggedItem?.country.countryName} into new list ${listIndexTarget}`)

            if (listIndexTarget >= 0 && listIndex !== listIndexTarget) {
                // remove dragged country from old favourite list
                updatedFavouriteLists[listIndex].favourites = updatedFavouriteLists[listIndex].favourites.filter(fav => fav.id != country.id);
                // add dragged country to new list
                updatedFavouriteLists[listIndexTarget].favourites = [...updatedFavouriteLists[listIndexTarget].favourites, country];
                
                handleUpdateUser({...currentUser, lists: updatedFavouriteLists});
            }
        }
        setDraggedItem(null);
        setDropArea(-1);
    };    

    // display all favourite countries in the given list
    const favouritesGrid = (favourites: UserFavourite[], listIndex: number) => (
        favourites.map(fav => 
            <Grid item key={fav.id} xs={6} sm={4} md={3} lg={2} >
                <SmallCountryCard code={fav.countryCode} name={fav.countryName} flagImg={fav.countryFlag} dragging={draggedItem?.country.countryCode == fav.countryCode}
                    onDragStart={() => handleDragStart(fav, listIndex)} onDrag={handleDrag} dragConstraints={constraintsRef}
                    onDragEnd={handleDrop}/>
            </Grid>
        )
    )

    // give the active drop area a background colour while an item is dragged over it
    const dropAreaStyle = (listIndex: number) => dropArea == listIndex ? { background: theme.palette.extra.light} : {};

    return (
        <Box component="div" sx={{my: 4}} ref={constraintsRef}>
            {currentUser.lists.map((list, index) => 
                <Box component="section" key={list.id} sx={{my: 4}} >
                    <FavouriteListControls listId={list.id} listName={list.name} isFirst={index == 0}/>
                    {list.favourites.length > 0 ?
                        <Grid container rowSpacing={2} ref={(el:HTMLDivElement) => {dropZoneRefs.current[index] = el}} sx={dropAreaStyle(index)}>
                            { favouritesGrid(list.favourites, index) } 
                        </Grid> : 
                        <Box sx={{minHeight:'80px', width: '100%', border: '1px solid #252b48', p: 1, my: 2, ...dropAreaStyle(index) }} ref={(el:HTMLDivElement) => {dropZoneRefs.current[index] = el}}>
                            <Typography variant="body2" color={theme.palette.extra.contrastText}>Drag some favourite countries from the above lists to get started on your new list!</Typography>
                        </Box>
                    }
                </Box>
            )}
        </Box>
    )
}

export default FavouriteCountries