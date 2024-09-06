'use client'
import { useUserContext } from "@/context/UserContext";
import { Box, Button, Link, TextField } from "@mui/material"
import axios from "axios";
import FormFeedback from "./FormFeedback";
import { useState } from "react";

// allows a user to update the name of a list of favourites
function FavouriteListControls({listId, listName}: {listId: number, listName: string}) {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [submitResult, setSubmitResult] = useState( {message: '', isError: false});

    if (!currentUser || !('id' in currentUser)) return <p>Please <Link href="/login" variant="body2">login</Link> to view your dashboard.</p>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        try {
            const response = await axios.put(`/api/lists/${listId}`, Object.fromEntries(formData));
            console.log(response)
            const updatedLists = currentUser.lists.map(list => list.id == listId ? {...list, name: response.data.data.name} : list);
            handleUpdateUser({...currentUser, lists: updatedLists});
            setSubmitResult({message: response.data.result, isError: false});
        } catch (err) {
            console.log(err)
            setSubmitResult({message: `Could not save list: ${(err as Error).message}`, isError: true});
        }
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{my: 2}}>
                <TextField id={`list${listId}-name`} label="List Name" variant="standard" name="name" defaultValue={listName} />
                <Button variant="outlined" type="submit">Update Name</Button>
            </Box>
            <FormFeedback message={submitResult.message} isError={submitResult.isError} onClose={() => setSubmitResult({message: '', isError: false})}/>
        </>
    )
}

export default FavouriteListControls