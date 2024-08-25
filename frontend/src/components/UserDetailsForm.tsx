import { useUserContext } from "@/context/UserContext";
import { Button, Grid, Input, TextField } from "@mui/material";

// All form fields required for user registration or updates
export default function UserDetailsForm({onImgChange}: {onImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    const {currentUser} = useUserContext();
    const authUser = currentUser && 'id' in currentUser;

    return (
        <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} md={6}>
                <TextField
                    autoComplete="user-name" name="userName"
                    required fullWidth autoFocus
                    id="userName" label="User Name"
                    defaultValue={authUser ? currentUser.userName : ''}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Input type="file" name="file" onChange={onImgChange}/>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    required fullWidth
                    id="email" label="Email Address"
                    name="email" autoComplete="email"
                    defaultValue={authUser ? currentUser.email : ''}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField // password is only required for new users
                    required={!authUser} fullWidth
                    name="password" autoComplete="new-password"
                    type="password"
                    id="password" label="Password"
                />
            </Grid>

            <Grid xs={0} md={3}>&nbsp;</Grid>

            <Grid item xs={12} md={6}>
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Submit</Button>
            </Grid>

            <Grid xs={0} md={3}>&nbsp;</Grid>      
        </Grid>  
    )
}