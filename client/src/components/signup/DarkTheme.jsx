import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const DarkTheme = ({className}) => {
    const [isDark, setDark] = useState(false);
    useEffect(() => {
        // initial set 

        // check localStorage on mount
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setDark(true);
            document.documentElement.classList.add("dark"); // এখানে class add
        } else if (storedTheme === "light") {
            setDark(false);
            document.documentElement.classList.remove("dark"); // এখানে class remove
        }






    }, []);

    // theme toggle fnc
    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        setDark(!isDark);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    return (
        <button className={`${className}`} onClick={toggleTheme}> {isDark
            ? <Sun color="white" />
            : <Moon color="black" />
        }</button>
    )
}

export default DarkTheme