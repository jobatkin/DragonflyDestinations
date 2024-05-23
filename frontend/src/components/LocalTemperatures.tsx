'use client'

import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useState } from "react";

interface LocalTemperaturesProps {
    main: number,
    min: number,
    max: number,
    units?: string
}

// client component to display temps and allow user to switch between celcius (default) and farenheit
function LocalTemperatures({main, min, max, units}: LocalTemperaturesProps) {
    const [useCelcius, setUseCelcius] = useState(units != 'F');
    const convertToFarenheit = (temp: number) => (temp * 9.0 / 5.0) + 32.0;
    const displayUnits = useCelcius ? 'C' : 'F';

    return (
        <Grid container>
            <Grid item xs={8}>
                <div><strong>Current temp:</strong> {useCelcius ? main : convertToFarenheit(main)}&deg;{displayUnits}</div>
                <div><strong>Min temp:</strong> {useCelcius ? min : convertToFarenheit(min)}&deg;{displayUnits}</div>
                <div><strong>Max temp:</strong> {useCelcius ? max : convertToFarenheit(max)}&deg;{displayUnits}</div>
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel 
                    sx={{justifyContent: 'flex-end'}}
                    control={<Switch defaultChecked color="info" onChange={() => setUseCelcius(!useCelcius)}/>} 
                    label="Celcius" />        
            </Grid>
        </Grid>
    )
}

export default LocalTemperatures;