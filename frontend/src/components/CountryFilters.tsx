'use client';

import { Box, Grid, SelectChangeEvent } from "@mui/material";
import { CountryWithFlag } from "@/types";
import CountryFilter from "./CountryFilter";
import CountrySorting, { SortType, countrySortOptions } from "./CountrySorting";

interface CountryFiltersProps {
    countries: CountryWithFlag[],
    selectedRegion: string,
    handleRegionChange: (event: SelectChangeEvent<string>) => void,
    selectedSubregion: string,
    handleSubregionChange: (event: SelectChangeEvent<string>) => void,
    sortBy?: SortType,
    handleSortChange?: (sortBy: string, sortOrder: string) => void,
    sortAscending: boolean
}

function CountryFilters({countries, selectedRegion, handleRegionChange, selectedSubregion, handleSubregionChange, sortBy, handleSortChange, sortAscending}: CountryFiltersProps) {

    const sortField = sortBy ? sortBy : 'name';

    // create a map of all unique regions with their sub-regions, for filtering
    const regions: Map<string, Set<string>> = new Map();
    countries.forEach(country => {
        if (!regions.has(country.region)) {
            regions.set(country.region, new Set());
        }
        regions.get(country.region)!.add(country.subregion);
    });
    let subregionResult = regions.get(selectedRegion);
    let subregions = subregionResult ? Array.from(subregionResult) : ['Select a region first'];

    return (
        <Grid container my={2} rowSpacing={2} columnSpacing={2}>
            <Grid item>
                <CountryFilter label="Region" selectedValue={selectedRegion} handleChange={handleRegionChange} options={Array.from(regions.keys())}/>
                <CountryFilter label="Sub-region" selectedValue={selectedSubregion} handleChange={handleSubregionChange} options={subregions}/>
            </Grid>
            <Grid item>
                <CountrySorting field={sortField} sortAscending={sortAscending} onSortChange={handleSortChange}/>
            </Grid>
        </Grid>
    )
}

export default CountryFilters;