import { User } from "@/context/UserContext"
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsTwoTone';
import { Grid } from "@mui/material";

function HighScore({leader, position} : {leader: User, position: number}) {

    let award = <></>;
    switch (position) {
        case 1: award = <EmojiEventsIcon color='secondary' />; break;
        case 2: award = <EmojiEventsIcon color='silver' />; break;
        case 3: award = <EmojiEventsIcon sx={{ color: 'secondary.dark'}} />; break;
    }

    return (
        <Grid container justifyContent="space-between" sx={{background: position % 2 == 0 ? 'rgba(0,0,0,0.2)' : 'inherit', px: '1em'}}> 
            <Grid item xs={2}>{position}</Grid>
            <Grid item xs={4}>{leader.userName}</Grid>
            <Grid item xs={4} sx={{textAlign: 'center'}}>{leader.highScore}</Grid>
            <Grid item xs={2} sx={{textAlign: 'right'}}>{award}</Grid>
        </Grid>
    )
}

export default HighScore