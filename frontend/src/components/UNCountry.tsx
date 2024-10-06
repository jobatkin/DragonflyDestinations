import { Box, Typography } from "@mui/material";
import Image from "next/image";

function UNCountry({unMember, countryName}:{unMember: boolean, countryName: string}) {

    if (!unMember) return null;

    return (
        <Box sx={{textAlign: 'center', p:2}}>
            <Image src="/united_nations_logo.svg" alt="United Nations Member" title="United Nations Member" style={{padding: '1em'}}/>
            <Typography variant="body2">{countryName} is a member of the United Nations.</Typography>
        </Box>
    )
}

export default UNCountry