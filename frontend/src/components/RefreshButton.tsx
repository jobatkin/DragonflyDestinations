'use client';

import { forceRefresh } from "@/app/actions";
import { Button, ButtonProps } from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface RefreshButtonProps {
    buttonText: string, 
    refreshingText?: string, 
    buttonSize?: ButtonProps["size"],
    color?: ButtonProps["color"]
}

// forces a server refresh of the current page using a server action
export default function RefreshButton({buttonText, refreshingText = 'Refreshing...', buttonSize = "medium", color = "primary"}: RefreshButtonProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const pathname = usePathname()

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await forceRefresh(pathname); // refresh the current path
        window.location.reload();
    };
  
    return (
        <Button onClick={handleRefresh} disabled={isRefreshing} color={color} size={buttonSize}>
            {isRefreshing ? refreshingText : buttonText}
        </Button>
    );
}