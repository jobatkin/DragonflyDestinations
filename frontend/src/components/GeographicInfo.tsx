import TextHelper from "@/utils/TextHelper";
import {Card, CardContent, Typography} from "@mui/material";

function GeographicInfo({terrain, naturalResources, industries}: {terrain?: string, naturalResources?: string, industries?: string}) {
    if (!terrain && !naturalResources && !industries) return null;

    return (
        <Card sx={{ backgroundColor: `extra.main`, color: `extra.contrastText`, mb: 2 }}>
            <CardContent sx={{'&:last-child': { pb: 1 }}}>
                { terrain && 
                <><Typography variant="h4">Terrain: </Typography>
                <Typography sx={{mb: 1, borderBottom: '1px solid rgba(200,200,200,0.3)', pb: 1}}>{TextHelper.makeSentence(terrain)}</Typography></> }

                { naturalResources && 
                <><Typography variant="h4">Natural Resources: </Typography>
                <Typography sx={{mb: 1, borderBottom: '1px solid rgba(200,200,200,0.3)', pb: 1}}>{TextHelper.makeSentence(naturalResources)}</Typography></> }

                { industries && 
                <><Typography variant="h4">Industries: </Typography>
                <Typography>{TextHelper.makeSentence(industries)}</Typography></> }                
            </CardContent>
        </Card>
    );
}
export default GeographicInfo;
