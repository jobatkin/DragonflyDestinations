'use client'
import { useUserContext } from "@/context/UserContext";
import APIHelper from "@/utils/APIHelper";
import LoggingHelper from "@/utils/LoggingHelper";
import { Button } from "@mui/material";

// Displays an Add New List button if user is logged in - when clicked creates a new favourites list
function NewListButton() {
    const {currentUser, handleUpdateUser} = useUserContext();
    if (!currentUser || !('id' in currentUser)) return null;

    const handleAddList = async () => {
        try {
            const response = await APIHelper.postData(`/api/lists/${currentUser.id}`, {name: 'New List'});
            const updatedLists = [...currentUser.lists, response.data];
            handleUpdateUser({...currentUser, lists: updatedLists});
        } catch (err) {
            LoggingHelper.error(err as Error);
        }
    }

    return (
        <Button onClick={handleAddList} variant="contained">Add New List</Button>
    )
}

export default NewListButton