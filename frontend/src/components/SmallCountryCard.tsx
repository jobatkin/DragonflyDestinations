import { CardContent, Card, CardMedia, Typography, CardActionArea } from "@mui/material";
import { motion, PanInfo } from "framer-motion";
import { MutableRefObject } from "react";

export interface SmallCountryCardProps {
    code: string,
    name: string,
    flagImg: string,
    colour?: string,
    onDrag?: () => void,
    onDragEnd?: (event: MouseEvent | TouchEvent | null, info: PanInfo) => void,
    dragConstraints? : MutableRefObject<null>
}

// Display a single Small Country Card, including flag and name
function SmallCountryCard(props: SmallCountryCardProps) {
    const colour = props.colour ? props.colour : 'primary'; // base colour defaults to primary if not specified
    const dragProps = props.onDrag ? { drag: true, draggable: true, onDragStart: props.onDrag, onDragEnd: props.onDragEnd, dragConstraints: props.dragConstraints } : {};
    const cardStyle = { backgroundColor: `${colour}.main`, color: `${colour}.contrastText`, mx: '0.5em' };

    return (
        <Card className="SmallCountryCard" sx={cardStyle} component={motion.div} {...dragProps}>
            <CardActionArea href={`/discover/${props.code}`}>
                <CardMedia
                    sx={{ height: 80 }}
                    image={props.flagImg}
                    title={props.name}
                />            
            </CardActionArea>
            <CardContent sx={{p:1, '&:last-child': { pb: 1 }}}>
                <Typography variant="h5" sx={{textAlign: 'center'}}>{props.name}</Typography>     
            </CardContent>
        </Card>
    )
}

export default SmallCountryCard