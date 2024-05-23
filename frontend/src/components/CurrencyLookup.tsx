'use client'
import { Box, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const baseCurrencies = ['USD', 'AUD', 'SGD', 'CAD', 'JPY', 'GBP', 'EUR', 'NZD'];

// Uses the Frankfurter API to convert a set amount from a currency of this country to one of the major world currencies
function CurrencyLookup({currencies, amount = 10}: {currencies: string[], amount: number}) {
    const [fromCurrency, setFromCurrency] = useState(currencies[0]);
    const [toCurrency, setToCurrency] = useState(baseCurrencies[0]);
    const [conversion, setConversion] = useState(amount);
    const [error, setError] = useState('');

    useEffect(() => {
        const getConversion = async () => {
            try {
                const response = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
                setConversion(response.data.rates[toCurrency]);
            }
            catch (err) {
                setError(`Cannot convert from ${fromCurrency} to ${toCurrency}: ${(err as Error).message}`)
            }
        }
        getConversion();
    }, [toCurrency, fromCurrency]);

    const handleChangeCurrency = (type: string, newValue: string) => {
        if (type == 'to') setToCurrency(newValue);
        else setFromCurrency(newValue);
    }

    const currencySelect = (type: string, selected: string, options: string[]) => (
        <Select value={selected} onChange={(e) => handleChangeCurrency(type, e.target.value)} sx={{'& .MuiSelect-select':{p:1}}}>
            {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
        </Select>)

    if (error) return <Box>{error}</Box>

    return (
        <Box>
            <strong>{amount}</strong> {currencySelect('from', fromCurrency, currencies)} is currently worth{" "}
            <strong>{conversion}</strong> {currencySelect('to', toCurrency, baseCurrencies)}
        </Box>
    )
}

export default CurrencyLookup;