'use client'
import { Flag } from "@/types";
import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export interface FlagProps extends Flag {
    name: string,
}

// displays a flag with responsive photo and description
function FlagDetails(props: FlagProps) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    return (
        <Box sx={{mb: 2, position: 'relative'}}>
            <Image src={props.svgLink} alt={'Flag of ' + props.name}  loading="lazy" style={{maxWidth: '100%', height: 'auto'}} sizes="(max-width: 600px) 100vw, 350px"

                onLoadingComplete={target => {
                    setDimensions({
                        width: target.naturalWidth,
                        height: target.naturalHeight
                    });
                }}
                width={dimensions.width}
                height={dimensions.height}/>
            <p>{props.description}</p>
        </Box>        
    )
}
export default FlagDetails