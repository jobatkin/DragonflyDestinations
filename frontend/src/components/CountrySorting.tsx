import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

// https://steveholgado.com/typescript-types-from-arrays/ < how to define an array once and then use it for typing
export const countrySortOptions = ['name', 'region', 'subregion', 'population', 'area'] as const;
export type SortType = typeof countrySortOptions[number];

interface CountrySortingProps {
    field: SortType,
    sortAscending: boolean,
    onSortChange?: (sortBy: string, sortOrder: string) => void,
}

// Sort countries on supported fields in either ascending or descending order
function CountrySorting({field, sortAscending, onSortChange}: CountrySortingProps) {
    const inputId = 'country-sort-options';
    const sortOrder = sortAscending ? 'ASC' : 'DESC';

    const handleChangeSort = (event: SelectChangeEvent<string>) => {
        let newSortField = event.target.name == `select-${inputId}` ? event.target.value : field;
        let newSortOrder = event.target.name == `select-${inputId}-order` ? event.target.value : sortOrder;
        if (onSortChange) onSortChange(newSortField, newSortOrder);
    };

    return (
        <>
            <FormControl fullWidth sx={{minWidth: '10em'}}>
                <InputLabel id={inputId}>Sort By</InputLabel>
                <Select
                    labelId={inputId}
                    id={`select-${inputId}`} name={`select-${inputId}`}
                    value={field}
                    label="Sort By"
                    onChange={handleChangeSort}
                >
                    {countrySortOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>          

            <FormControl fullWidth sx={{minWidth: '10em'}}>
                <InputLabel id={inputId}>Order</InputLabel>
                <Select
                    labelId={inputId + '-order'}
                    id={`select-${inputId}-order`} name={`select-${inputId}-order`}
                    value={sortOrder}
                    label="Sort Order"
                    onChange={handleChangeSort}
                >
                    <MenuItem value="ASC">ASC</MenuItem>
                    <MenuItem value="DESC">DESC</MenuItem>
                </Select>
            </FormControl>    
        </>
    )
}

export default CountrySorting;