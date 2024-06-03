'use client';

import { useEffect, useState } from "react";
import DarkmodeIcon from "./ui/icons/DarkmodeIcon";
import LightModeIcon from "./ui/icons/LightModeIcon";

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 ml-4 text-black dark:text-white transition duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
            {isDarkMode ? <LightModeIcon/> : <DarkmodeIcon/>}
        </button>
    );
}
