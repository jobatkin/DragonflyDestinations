'use client'

import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
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
                <div>Current temp: {useCelcius ? main : convertToFarenheit(main)}&deg;{displayUnits}</div>
                <div>Min temp: {useCelcius ? min : convertToFarenheit(min)}&deg;{displayUnits}</div>
                <div>Max temp: {useCelcius ? max : convertToFarenheit(max)}&deg;{displayUnits}</div>
            </Grid>
            <Grid item xs={4}>
                <FormGroup>
                    <FormControlLabel 
                        sx={{justifyContent: 'flex-end'}}
                        control={<Switch defaultChecked onChange={() => setUseCelcius(!useCelcius)}/>} 
                        label="Celcius" />        
                </FormGroup>        
            </Grid>
        </Grid>
    )
}

export default LocalTemperatures;