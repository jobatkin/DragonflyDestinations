import { Box, Typography } from "@mui/material";
import Image from "next/image";
import unLogo from "/public/united_nations_logo.svg"

// if this country is a member of the United Nations, display the UN logo and a desccription
function UNCountry({unMember, countryName}:{unMember: boolean, countryName: string}) {

    if (!unMember) return null;

    return (
        <Box sx={{textAlign: 'center', p:2}}>
            <Image src={unLogo} alt="United Nations Member" title="United Nations Member" style={{padding: '1em', maxWidth: '100%', height: 'auto'}}/>
            <Typography variant="body2">{countryName} is a member of the United Nations.</Typography>
        </Box>
    )
}

export default UNCountry