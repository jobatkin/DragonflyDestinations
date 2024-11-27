'use client';

import TextHelper from "@/utils/TextHelper";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"

interface CountryFilterProps {
    label: string, 
    selectedValue: string, 
    handleChange: (event: SelectChangeEvent<string>) => void,
    options: string[]
}

function CountryFilter({label, selectedValue, handleChange, options}: CountryFilterProps) {
    const inputId = `country-filter-${label.replaceAll(' ', '-').toLowerCase()}`;
    const displayOptions = options.filter(option => Boolean(option)) // filter out null values

    return (
        <FormControl fullWidth sx={{minWidth: '10em'}}>
            <InputLabel id={inputId}>{label}</InputLabel>
            <Select
                labelId={inputId} id={inputId+'-select'}
                value={selectedValue}
                label={label}
                onChange={handleChange}
            >
                {displayOptions.map(option => (
                    <MenuItem key={option} value={option}>{option.split(' ').map(word => TextHelper.ucFirst(word)).join(' ')}</MenuItem>
                ))}
            </Select>
        </FormControl>        
    )
}

export default CountryFilter