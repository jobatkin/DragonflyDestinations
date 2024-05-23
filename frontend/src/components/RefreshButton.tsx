'use client';

import { forceCountryRefresh } from "@/app/surprise/actions";
import { Button } from "@mui/material";
import { useState } from "react";

interface RefreshButtonProps {
    buttonText: string, 
    refreshingText?: string, 
    buttonSize?: "medium" | "small" | "large"
}

// forces a server refresh using a server action
export default function RefreshButton({buttonText, refreshingText = 'Refreshing...', buttonSize = "medium"}: RefreshButtonProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);
  
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await forceCountryRefresh();
        window.location.reload();
    };
  
    return (
        <Button onClick={handleRefresh} disabled={isRefreshing} size={buttonSize}>
            {isRefreshing ? refreshingText : buttonText}
        </Button>
    );
}