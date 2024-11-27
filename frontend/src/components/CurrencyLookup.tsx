'use client'
import { useCurrency } from "@/hooks/useCurrency";
import { validCurrencies } from "@/types";
import { Box, MenuItem, Select } from "@mui/material";
import { useState } from "react";

// Uses the Frankfurter API to convert a set amount from a currency of this country to one of the major world currencies
function CurrencyLookup({currencies, amount = 10}: {currencies: string[], amount: number}) {
    const [fromCurrency, setFromCurrency] = useState(currencies[0]);
    const [toCurrency, setToCurrency] = useState(validCurrencies[0] as typeof validCurrencies[number]);

    const [conversion, success, error] = useCurrency(amount, fromCurrency, toCurrency);

    const handleChangeCurrency = (type: 'from' | 'to', newValue: string) => {
        // 'to' currencies have to come from the valid list, 'from' may not
        if (type == 'to') setToCurrency(newValue as typeof validCurrencies[number]);
        else setFromCurrency(newValue);
    }

    const currencySelect = (type: 'from' | 'to', selected: string, options: string[]) => (
        <Select value={selected} onChange={(e) => handleChangeCurrency(type, e.target.value)} sx={{'& .MuiSelect-select':{p:1}}}>
            {options
                .filter(option => type == 'to' ? option != fromCurrency : option != toCurrency) // to and from can't be the same
                .map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
        </Select>)

    if (!success) return <Box>{error}</Box>

    return (
        <Box>
            <strong>{amount}</strong> {currencySelect('from', fromCurrency, currencies)} is currently worth{" "}
            <strong>{conversion}</strong> {currencySelect('to', toCurrency, validCurrencies.map(curr => curr.toString()))}
        </Box>
    )
}

export default CurrencyLookup;