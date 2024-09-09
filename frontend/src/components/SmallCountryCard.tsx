import { CardContent, Card, CardMedia, Typography, CardActionArea } from "@mui/material";
import { motion, PanInfo } from "framer-motion";
import { MutableRefObject } from "react";

export interface SmallCountryCardProps {
    code: string,
    name: string,
    flagImg: string,
    colour?: string,
    onDragStart?: () => void,
    onDrag?: (event: MouseEvent | TouchEvent | null, info: PanInfo) => void,
    onDragEnd?: (event: MouseEvent | TouchEvent | null, info: PanInfo) => void,
    dragging? : boolean,
    dragConstraints? : MutableRefObject<null>
}

// Display a single Small Country Card, including flag and name, with support for dragging
// if passing drag props, ensure this component is rendered via the client
function SmallCountryCard(props: SmallCountryCardProps) {
    const colour = props.colour ? props.colour : 'primary'; // base colour defaults to primary if not specified
    const isDraggable = props.onDragStart || props.onDragEnd;
    const dragProps = isDraggable ? { 
        drag: true, 
        dragElastic: 0.2, 
        dragSnapToOrigin: true, 
        onDragStart: props.onDragStart, 
        onDrag: props.onDrag, 
        onDragEnd: props.onDragEnd, 
        dragConstraints: props.dragConstraints,
        component: motion.div
    } : {};
    const cardStyle = { backgroundColor: `${colour}.main`, color: `${colour}.contrastText`, mx: '0.5em' };
    const cardComponent = isDraggable ? motion.div : 'div';
    const cursorStyle = props.dragging ? { cursor: 'grabbing'} : isDraggable ? { cursor: 'grab'} : {};

    return (
        <Card className="SmallCountryCard" sx={cardStyle} {...dragProps} component={cardComponent}>
            <CardActionArea href={`/discover/${props.code}`}>
                <CardMedia
                    sx={{ height: 80 }}
                    image={props.flagImg}
                    title={props.name}
                />            
            </CardActionArea>
            <CardContent sx={{p:1, '&:last-child': { pb: 1 }, ...cursorStyle}}>
                <Typography variant="h5" sx={{textAlign: 'center'}}>{props.name}</Typography>     
            </CardContent>
        </Card>
    )
}

export default SmallCountryCard