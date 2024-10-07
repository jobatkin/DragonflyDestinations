'use client'

import { Typography } from "@mui/material";
import { useState } from "react"

interface ReadMoreProps {
    text: string, 
    maxLength?: number,

}

// if text is longer than maxLength, displays ... and Less links to enable hiding/showing large blocks of text
function ReadMore({text, maxLength = 150}: ReadMoreProps) {
    const [showAll, setShowAll] = useState(false);

    let displayText = text;
    let action = null;

    if (displayText && displayText.length > maxLength) {
        displayText = showAll ? displayText : displayText.substring(0, maxLength);
        action = showAll ? 
            <a href="#" onClick={ (e) => {e.preventDefault(); setShowAll(false)} }>Less</a> : 
            <a href="#" onClick={ (e) => {e.preventDefault(); setShowAll(true)} }>...</a>;
    }

    return (
        <Typography gutterBottom>{displayText}{' '}{action}</Typography>
    )
}

export default ReadMore