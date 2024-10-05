'use client'
import { useUserContext } from "@/context/UserContext";
import { Button } from "@mui/material";
import axios from "axios";

// Displays an Add New List button if user is logged in - when clicked creates a new favourites list
function NewListButton() {
    const {currentUser, handleUpdateUser} = useUserContext();
    if (!currentUser || !('id' in currentUser)) return null;

    const handleAddList = async () => {
        try {
            const response = await axios.post(`/api/lists/${currentUser.id}`, {name: 'New List'});
            const updatedLists = [...currentUser.lists, response.data.data];
            handleUpdateUser({...currentUser, lists: updatedLists});
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Button onClick={handleAddList} variant="contained">Add New List</Button>
    )
}

export default NewListButton