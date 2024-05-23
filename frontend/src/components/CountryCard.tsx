import { CardContent, Card, CardMedia, Typography, Grid, CardActionArea } from "@mui/material";
import { Country } from "@/types";

export interface CountryCardProps extends Country {
    flagImg: string,
    colour?: string,
    single?: boolean
}

// Display a single Country Card, including flag, name, region/subregion, population and area
function CountryCard(props: CountryCardProps) {
    const colour = props.colour ? props.colour : 'primary'; // base colour defaults to primary if not specified
    const single = props.single === undefined ? true : props.single; // are we showing a single card at a time? true if not specified
    const cardMargins = single ? {xs: '0.5em', lg: '2em'} : { xs: '0.5em' }; // margins around card change if in a grid or single

    return (
        <Card className="CountryCard" sx={{ backgroundColor: `${colour}.main`, color: `${colour}.contrastText`, mx: cardMargins }}>
            <CardActionArea href={`/discover/${props.code}`}>
                <CardMedia
                    sx={{ height: 160 }}
                    image={props.flagImg}
                    title={props.name}
                />            
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h3">
                    {props.name}
                </Typography>
                <Typography gutterBottom variant="h5" color="text.secondary">
                    Where? {props.subregion}, {props.region}
                </Typography>      
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="body2">Population: {props.population.toLocaleString()}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">Area: {props.area.toLocaleString()} km<sup>2</sup></Typography>
                    </Grid>                    
                </Grid>          
            </CardContent>
        </Card>
    )
}

export default CountryCard