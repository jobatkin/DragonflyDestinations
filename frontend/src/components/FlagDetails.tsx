import { Flag } from "@/types";
import { Box } from "@mui/material";
import Image from "next/image";

export interface FlagProps extends Flag {
    name: string,
}

function FlagDetails(props: FlagProps) {
    return (
        <Box sx={{mb: 2}}>
            <Image src={props.svgLink} alt={'Flag of ' + props.name} loading="lazy" style={{maxWidth: '100%', height: 'auto'}} />
            <p>{props.description}</p>
        </Box>        
    )
}
export default FlagDetails