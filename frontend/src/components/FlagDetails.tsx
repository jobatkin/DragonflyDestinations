import { Flag } from "@/types";
import { Box } from "@mui/material";
import Image from "next/image";

export interface FlagProps extends Flag {
    name: string,
}

// displays a flag with responsive photo and description
function FlagDetails(props: FlagProps) {

    return (
        <Box sx={{mb: 2, position: 'relative'}}>
            <Image src={props.svgLink} alt={'Flag of ' + props.name} priority width={props.width} height={props.height} 
                style={{maxWidth: '100%', height: 'auto'}} sizes="(max-width: 600px) 100vw, 350px"/>
            <p>{props.description}</p>
        </Box>        
    )
}
export default FlagDetails