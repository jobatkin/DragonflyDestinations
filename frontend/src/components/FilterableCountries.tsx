'use client';

import { useState } from "react";
import { CountryWithFlag } from "@/types";
import CountryFilters from "./CountryFilters";
import CountryCard from "./CountryCard";
import { Grid } from "@mui/material";
import { countrySortOptions, SortType } from "./CountrySorting";

export interface FilterableCountries {
    countries: CountryWithFlag[]
}

function FilterableCountries({countries}: FilterableCountries) {

    const [region, setRegion] = useState('');
    const [subregion, setSubregion] = useState('');
    const [sortBy, setSortBy] = useState<SortType>('name');
    const [sortAscending, setSortAscending] = useState(true);

    const filteredCountries = countries.filter(country => (!region || country.region == region) && (!subregion || country.subregion == subregion) );
    const sortedCountries = [...filteredCountries].sort((countryA, countryB) => (countryA[sortBy] < countryB[sortBy]) ? -1 : 1);
    if (!sortAscending) sortedCountries.reverse();

    // create the actual country cards based on the selected filters and sort option
    const countryCards = sortedCountries.map(country => (
        <Grid key={country.name} xs={6} md={4} lg={3} item>
            <CountryCard {...country} flagImg={country.flag.svgLink} colour="info" single={false}/>
        </Grid>
    ))

    const handleSortChange = (sortBy: string, sortOrder: string) => {
        let newSortBy:SortType = 'name';
        if (countrySortOptions.includes(sortBy as SortType)) newSortBy = sortBy as SortType;

        // console.log(`sorting by ${newSortBy} ${sortOrder}`)
        setSortBy(newSortBy);
        setSortAscending(sortOrder == 'ASC');
    }

    return (
        <div className="FilterableCountries">
            <CountryFilters countries={countries} 
                selectedRegion={region} handleRegionChange={(e) => setRegion(e.target.value)}
                selectedSubregion={subregion} handleSubregionChange={(e) => setSubregion(e.target.value)} 
                sortBy={sortBy} handleSortChange={handleSortChange} sortAscending={sortAscending}/>

            <Grid container rowSpacing={5} columnSpacing={5} my={5}>
                {countryCards}
            </Grid>
        </div>
    )
}

export default FilterableCountries