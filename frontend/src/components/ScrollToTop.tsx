'use client'

import {useState, useEffect} from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollToTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const showTopButton = () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        }
        window.addEventListener("scroll", showTopButton);

        return () => {
            window.removeEventListener("scroll", showTopButton);
        }
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!showTopBtn) return false;

    return (
        <KeyboardArrowUpIcon
            onClick={goToTop}
            color="secondary"
            sx={{
                position: "fixed",
                bottom: "1em",
                right: "1em",
                background: "rgba(50,50,50,0.5)",
                borderRadius: "50%",
                padding: "0.25em",
                width: "2em",
                height: "2em",
                cursor: 'pointer'
            }}
        />
    );
};

export default ScrollToTop;
