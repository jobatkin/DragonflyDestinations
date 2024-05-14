import { Grid } from "@mui/material";
import CalloutModule, { CalloutButtonProps } from "./CalloutModule";
import CountryCard, { CountryCardProps } from "./CountryCard";

interface HomeSectionProps {
    title: string,
    description: React.ReactNode,
    country: CountryCardProps,
    button1?: CalloutButtonProps,
    flagSide?: string
}

function HomeSection(props: HomeSectionProps) {
    const flagSide = props.flagSide ? props.flagSide : 'right';
    const calloutColumn = 
        <Grid item lg={6} md={7} xs={12}>
            <CalloutModule title={props.title} button1={props.button1}>
                {props.description}
            </CalloutModule>
        </Grid>;

    const countryColumn = 
        <Grid item md={5} xs={12}>
            <CountryCard
                colour="info"
                name={props.country.name} capital={props.country.capital}
                region={props.country.region} subregion={props.country.subregion}
                flagImg={props.country.flagImg}
                population={props.country.population} area={props.country.area}
            />
        </Grid>

    return (
        <>
            {flagSide == 'left' ? countryColumn : calloutColumn}

            {/* spacer on wide screens */}
            <Grid item md={1} sx={{display: {xs: "none", lg: "flex"}}}></Grid>
            
            {flagSide == 'left' ? calloutColumn : countryColumn}
        </>
    );
}

export default HomeSection;
