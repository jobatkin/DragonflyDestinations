'use client'

import { ButtonProps, Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface TourismItemsProps {
    items: string[], 
    colour: ButtonProps["color"], 
    icon: ReactNode, 
    heading: string,
    extraItem?: { iconValue: number, bgColour: string, heading: string, text: string }
}

function TourismItems({items, colour, icon, heading, extraItem}: TourismItemsProps) {
    const theme = useTheme();
    const cardColour = colour && colour != 'inherit' ? colour : 'primary';

    const extraListItem = extraItem ? (
        <ListItem disablePadding sx={{backgroundColor: extraItem.bgColour + '66', px: '1em', borderTop: `1px solid ${theme.palette[cardColour].dark}`}}>
            <ListItemIcon><strong>{extraItem.iconValue}</strong></ListItemIcon>
            <ListItemText primary={extraItem.heading.toUpperCase()} secondary={extraItem.text} />
        </ListItem>
    ) : null;

    return (
        <Card color="primary" sx={{my: 1}}>
            <CardHeader sx={{background: theme.palette[cardColour].dark}} title={heading} />
            <CardContent sx={{backgroundColor: `${colour}.main`, p: 0, pt: '0.5em', '&:last-child': { pb: 0 }}}>
                <List sx={{py: 0}}>
                    {items.map((item, i) => (
                        <ListItem disablePadding key={item} sx={{px: 2, pb: i == items.length-1 ? '0.5em' : 0}}>
                            <ListItemIcon sx={{minWidth: {xs: '2em', md: '3em'}}}>{icon}</ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                    {extraListItem}
                </List>
            </CardContent>
        </Card>
    );
}

export default TourismItems;
