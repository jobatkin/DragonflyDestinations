'use client'

import { Typography } from "@mui/material";
import { useState } from "react"

function ReadMore({text = '', maxLength = 180}: {text?: string, maxLength?: number}) {
    const [showAll, setShowAll] = useState(false);

    let displayText = text;
    let action = null;

    if (displayText.length > maxLength) {
        displayText = showAll ? displayText : displayText.substring(0, maxLength);
        action = showAll ? 
            <a href="#" onClick={ (e) => {e.preventDefault(); setShowAll(false)} }>Less</a> : 
            <a href="#" onClick={ (e) => {e.preventDefault(); setShowAll(true)} }>...</a>;
    }

    return (
        <Typography>{displayText}{' '}{action}</Typography>
    )
}

export default ReadMore