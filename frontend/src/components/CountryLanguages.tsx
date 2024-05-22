import {Language} from "@/types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

// display all languages for this country in a table
function CountryLanguages({languages}: {languages: Language[]}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="languages">
                <TableHead>
                    <TableRow>
                        <TableCell width="20%">Code</TableCell>
                        <TableCell>Language</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {languages.map((language) => (
                        <TableRow key={language.code}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                            <TableCell component="th" scope="row">{language.code}</TableCell>
                            <TableCell>{language.language}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CountryLanguages;
