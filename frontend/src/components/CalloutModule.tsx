import { Box, Button, ButtonGroup, Typography, ButtonProps } from "@mui/material";
import Link from "next/link";

export interface CalloutModuleProps {
    title: string,
    children: React.ReactNode,
    button1?: CalloutButtonProps,
    button2?: CalloutButtonProps,
    colour?: ButtonProps["color"], // automatically restricts possible values to only valid colour options for buttons
    shadow?: Boolean
}

export interface CalloutButtonProps {
    text: string,
    link: string
}

function CalloutModule({title, children, button1, button2, colour, shadow = false}: CalloutModuleProps) {
    const boxStyles = { display: 'flex', flexDirection: 'column', boxShadow: 'none', padding: {xs: '0.5em', lg: '2em'} }
    const buttonColour = colour || 'primary'; 
    if (shadow) boxStyles.boxShadow = '2px 2px 10px 5px rgba(0,0,0,0.5)';
    
    const hasButtons = button1 || button2;
    const textStyles = hasButtons ? { mb: '1em' } : {};

    return (
        <Box sx={boxStyles} className="CalloutModule">
            <Typography variant="h3" gutterBottom>
                {title}
            </Typography>
            <Typography component="div" sx={textStyles}>
                {children}
            </Typography>
            {hasButtons ? 
                <ButtonGroup>
                    {button1 && <Button component={Link} href={button1.link} size="large" variant="contained" color={buttonColour}>{button1.text}</Button>}
                    {button2 && <Button component={Link} href={button2.link} size="large" variant="outlined" color={buttonColour}>{button2.text}</Button>}
                </ButtonGroup>
            : null}
        </Box>
    )
}

export default CalloutModule;