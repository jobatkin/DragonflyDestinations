import { CardContent, Card, CardMedia, Typography, CardActionArea } from "@mui/material";

export interface SmallCountryCardProps {
    code: string,
    name: string,
    flagImg: string,
    colour?: string,
}

// Display a single Small Country Card, including flag and name
function SmallCountryCard(props: SmallCountryCardProps) {
    const colour = props.colour ? props.colour : 'primary'; // base colour defaults to primary if not specified

    return (
        <Card className="SmallCountryCard" sx={{ backgroundColor: `${colour}.main`, color: `${colour}.contrastText`, mx: '0.5em' }}>
            <CardActionArea href={`/discover/${props.code}`}>
                <CardMedia
                    sx={{ height: 80 }}
                    image={props.flagImg}
                    title={props.name}
                />            
            </CardActionArea>
            <CardContent sx={{p:1, '&:last-child': { pb: 1 }}}>
                <Typography variant="h5" sx={{textAlign: 'center'}}>{props.name}</Typography>     
            </CardContent>
        </Card>
    )
}

export default SmallCountryCard