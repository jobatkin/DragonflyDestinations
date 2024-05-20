'use client';

import { useState } from "react";
import { CountryWithFlag } from "@/types";
import CountryFilters from "./CountryFilters";
import CountryCard from "./CountryCard";
import { Grid } from "@mui/material";

export interface FilterableCountries {
    countries: CountryWithFlag[]
}

function FilterableCountries({countries}: FilterableCountries) {

    const [region, setRegion] = useState('');
    const [subregion, setSubregion] = useState('');

    const filteredCountries = countries.filter(country => (!region || country.region == region) && (!subregion || country.subregion == subregion) );
    const countryCards = filteredCountries.map(country => (
        <Grid key={country.name} xs={6} md={4} lg={3} item><CountryCard {...country} flagImg={country.flag.svgLink} colour="info" single={false}/></Grid>
    ))

    return (
        <div className="FilterableCountries">
            <CountryFilters countries={countries} selectedRegion={region} handleRegionChange={(e) => setRegion(e.target.value)}
                selectedSubregion={subregion} handleSubregionChange={(e) => setSubregion(e.target.value)} />

            <Grid container rowSpacing={5} columnSpacing={5} my={5}>
                {countryCards}
            </Grid>
        </div>
    )
}

export default FilterableCountries