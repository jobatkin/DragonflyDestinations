import { CardContent, Card, CardMedia, Typography, Grid } from "@mui/material";
import { Country } from "@/types";

export interface CountryCardProps extends Country {
    flagImg: string,
    colour?: string
}

function CountryCard(props: CountryCardProps) {
    const colour = props.colour ? props.colour : 'primary';

    return (
        <Card className="CountryCard" sx={{ backgroundColor: `${colour}.main`, color: `${colour}.contrastText`, mx: '2em' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={props.flagImg}
                title={props.name}
            />            
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
                        <Typography variant="body2">Area: {props.area.toLocaleString()}km<sup>2</sup></Typography>
                    </Grid>                    
                </Grid>          
            </CardContent>
        </Card>
    )
}

export default CountryCard