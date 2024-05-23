import {Language} from "@/types";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

// display all languages for this country in a table
function CountryLanguages({languages, other_languages}: {languages: Language[], other_languages?: string}) {

    if (!languages || languages.length == 0) return null;

    return (
        <Box sx={{mb: 2}}>
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
                        <TableRow key={language.code} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                            <TableCell component="th" scope="row">{language.code}</TableCell>
                            <TableCell>{language.language}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Typography sx={{p:1}} variant="body2">{other_languages}</Typography>
        </Box>
    );
}

export default CountryLanguages;
