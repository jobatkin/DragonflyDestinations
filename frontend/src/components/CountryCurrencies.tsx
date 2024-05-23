import { Currency } from "@/types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

// display all currencies for this country in a table
function CountryCurrencies({currencies}: {currencies: Currency[]}) {

    if (!currencies || currencies.length == 0) return null;
    
    return (
        <TableContainer component={Paper} sx={{mb: 2}}>
            <Table aria-label="languages">
                <TableHead>
                    <TableRow>
                        <TableCell width="20%">Code</TableCell>
                        <TableCell>Currency</TableCell>
                        <TableCell width="20%">Symbol</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currencies.map((currency) => (
                        <TableRow key={currency.code}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                            <TableCell component="th" scope="row">{currency.code}</TableCell>
                            <TableCell>{currency.name}</TableCell>
                            <TableCell>{currency.symbol}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CountryCurrencies;
