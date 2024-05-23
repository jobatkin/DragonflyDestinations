import { Grid, ButtonProps } from "@mui/material";
import CalloutModule, { CalloutButtonProps } from "./CalloutModule";
import CountryCard, { CountryCardProps } from "./CountryCard";

interface HomeSectionProps {
    title: string,
    description: React.ReactNode,
    country: CountryCardProps,
    button1?: CalloutButtonProps,
    flagSide?: string,
    highlightColour?: string
}

function HomeSection(props: HomeSectionProps) {
    const flagSide = props.flagSide ? props.flagSide : 'right';
    const highlightColour = props.highlightColour ? props.highlightColour : 'primary';

    const calloutColumn = 
        <Grid item lg={6} md={7} xs={12}>
            <CalloutModule title={props.title} button1={props.button1} colour={highlightColour as ButtonProps["color"]}>
                {props.description}
            </CalloutModule>
        </Grid>;

    const countryColumn = 
        <Grid item md={5} xs={12}>
            <CountryCard
                code={props.country.code}
                colour={highlightColour}
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
