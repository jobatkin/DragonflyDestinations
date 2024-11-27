'use client';

import { forceRefresh } from "@/app/actions";
import { Button, ButtonProps } from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface RefreshButtonProps {
    buttonText: string, 
    onRefresh?: () => void,
    refreshingText?: string, 
    buttonSize?: ButtonProps["size"],
    color?: ButtonProps["color"],
    scrollToTop?: boolean; // New prop to control scrolling behavior
}

// forces a server refresh of the current page using a server action
export default function RefreshButton({buttonText, onRefresh, refreshingText = 'Refreshing...', buttonSize = "medium", color = "primary", scrollToTop = false}: RefreshButtonProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const pathname = usePathname()

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await forceRefresh(pathname); // refresh the current path
        if (onRefresh) onRefresh();
        if (scrollToTop) window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
        setIsRefreshing(false);        
    };
  
    return (
        <Button onClick={handleRefresh} disabled={isRefreshing} color={color} size={buttonSize}>
            {isRefreshing ? refreshingText : buttonText}
        </Button>
    );
}