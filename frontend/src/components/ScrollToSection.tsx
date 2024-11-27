import {Button, ButtonProps, Typography} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {ReactNode} from "react";
import Link from "next/link";

interface ScrollToSectionProps {
    down?: boolean;
    startIcon: ReactNode;
    buttonText?: string;
    color?: ButtonProps["color"];
    destinationId: string;
}

// Creates an up or down button with a link to a HTML ID. The scroll behaviour CSS setting ensures the scrolling happens smoothly
function ScrollToSection({
    down = true,
    startIcon,
    buttonText = "",
    color = "primary",
    destinationId,
}: ScrollToSectionProps) {

    return (
        <Button
            component={Link}
            scroll={true}
            href={"#" + destinationId}
            startIcon={startIcon}
            endIcon={down ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            color={color}
            sx={{my: 1}}
        >
            <Typography sx={{fontSize: {xs: 0, md: '1rem'}}}>{buttonText}</Typography>
        </Button>
    );
}

export default ScrollToSection;
