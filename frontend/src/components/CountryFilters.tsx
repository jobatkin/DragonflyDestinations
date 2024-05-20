'use client';

import { Box, Grid, SelectChangeEvent } from "@mui/material";
import { CountryWithFlag } from "@/types";
import CountryFilter from "./CountryFilter";

interface CountryFiltersProps {
    countries: CountryWithFlag[],
    selectedRegion: string,
    handleRegionChange: (event: SelectChangeEvent<string>) => void,
    selectedSubregion: string,
    handleSubregionChange: (event: SelectChangeEvent<string>) => void,
}

function CountryFilters({countries, selectedRegion, handleRegionChange, selectedSubregion, handleSubregionChange}: CountryFiltersProps) {

    // create a map of all unique regions with their sub-regions, for filtering
    const regions: Map<string, Set<string>> = new Map();
    countries.forEach(country => {
        if (!regions.has(country.region)) {
            regions.set(country.region, new Set());
        }
        regions.get(country.region)!.add(country.subregion);
    });
    let subregionResult = regions.get(selectedRegion);
    let subregions = subregionResult ? Array.from(subregionResult) : [];

    return (
        <Grid container my={2}>
            <Grid item>
                <CountryFilter label="Region" selectedValue={selectedRegion} handleChange={handleRegionChange} options={Array.from(regions.keys())}/>
            </Grid>
            <Grid item>
                <CountryFilter label="Sub-region" selectedValue={selectedSubregion} handleChange={handleSubregionChange} options={subregions}/>
            </Grid>
        </Grid>
    )
}

export default CountryFilters;