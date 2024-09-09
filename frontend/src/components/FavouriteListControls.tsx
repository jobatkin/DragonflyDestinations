'use client'
import { useUserContext } from "@/context/UserContext";
import { Box, Button, Grid, Link, TextField } from "@mui/material"
import axios from "axios";
import FormFeedback from "./FormFeedback";
import { useState } from "react";

// allows a user to update the name of a list of favourites, or delete it if it's not the only one
function FavouriteListControls({listId, listName, isFirst = true}: {listId: number, listName: string, isFirst?: boolean}) {
    const {currentUser, handleUpdateUser} = useUserContext();
    const [submitResult, setSubmitResult] = useState( {message: '', isError: false});

    if (!currentUser || !('id' in currentUser)) return <p>Please <Link href="/login" variant="body2">login</Link> to view your dashboard.</p>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        try {
            const response = await axios.put(`/api/lists/${listId}`, Object.fromEntries(formData));
            console.log(response)

            // update the new list name in the current user object
            const updatedLists = currentUser.lists.map(list => list.id == listId ? {...list, name: response.data.data.name} : list);
            handleUpdateUser({...currentUser, lists: updatedLists});

            // show a message for a successful update
            setSubmitResult({message: response.data.result, isError: false});
        } catch (err) {
            console.log(err)
            setSubmitResult({message: `Could not save list: ${(err as Error).message}`, isError: true});
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/lists/${listId}`);

            // remove the deleted list from the current user object
            const updatedLists = currentUser.lists.filter(list => list.id != listId);
            handleUpdateUser({...currentUser, lists: updatedLists});

            // show a message for a successful delete
            setSubmitResult({message: response.data.result, isError: false});
        } catch (err) {
            console.log(err)
            setSubmitResult({message: `Could not delete list: ${(err as Error).message}`, isError: true});
        }
    }

    return (
        <>
            <Grid container component="form" onSubmit={handleSubmit} sx={{my: 2}} alignItems="center" gap={1}>
                <Grid item>
                    <TextField id={`list${listId}-name`} label="List Name" variant="filled" name="name" defaultValue={listName} />
                </Grid>
                <Grid item>
                    <Button variant="outlined" type="submit">Update</Button>
                </Grid>
                {!isFirst && 
                    <Grid item>
                        <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>
                    </Grid>
                }
            </Grid>
            <FormFeedback message={submitResult.message} isError={submitResult.isError} onClose={() => setSubmitResult({message: '', isError: false})}/>
        </>
    )
}

export default FavouriteListControls