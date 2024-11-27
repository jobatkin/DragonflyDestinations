'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { validCurrencies } from "@/types";
import CurrencyHelper from "@/utils/CurrencyHelper";
import LoggingHelper from "@/utils/LoggingHelper";

// lookup the current value of the given amount converted to and from the given currencies
export function useCurrency(amount: number = 10, fromCurrency: string, toCurrency: typeof validCurrencies[number] = 'USD') {

    const [convertedAmount, setConvertedAmount] = useState(amount);
    const [result, setResult] = useState({ success: false, message: ''});

    useEffect(() => {
        const validFromCurrency = fromCurrency as typeof validCurrencies[number];
        const fetchConversion = async () => {

            try {
                const response = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
                setConvertedAmount(response.data.rates[toCurrency]);
                setResult({ success: true, message: `Successful conversion from ${fromCurrency} to ${toCurrency}`});
                CurrencyHelper.getInstance().set(validFromCurrency, toCurrency, response.data.rates[toCurrency]);
            }
            catch (err) {
                setResult({success: false, message: `Error converting from ${fromCurrency} to ${toCurrency}`});
            }
        }

        // only try to lookup the conversion if the desired currency is supported and we don't have a saved cached value
        if (validCurrencies.includes(validFromCurrency)) {
            const savedCurrency = CurrencyHelper.getInstance().get(validFromCurrency, toCurrency);

            if (savedCurrency) {
                setConvertedAmount(savedCurrency);
                setResult({ success: true, message: `Successful conversion from ${fromCurrency} to ${toCurrency}`});
                LoggingHelper.log(`Found ${savedCurrency} amount in cache for currencies ${fromCurrency} to ${toCurrency}`)
            } else {
                fetchConversion();
                LoggingHelper.log(`Fetched new amount from frankfurter for currencies ${fromCurrency} to ${toCurrency}`)
            }

        } else {
            setResult({success: false, message: `Cannot convert ${fromCurrency}, currency not supported`});
        }

    }, [toCurrency, fromCurrency, amount]);    

    return [convertedAmount, result.success, result.message];
}