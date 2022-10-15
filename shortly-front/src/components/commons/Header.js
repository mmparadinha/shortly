import { useEffect, useState } from "react";
import HeaderLoggetOut from "./HeaderLoggedOut.js";
import HeaderLoggedIn from "./HeaderLoggedIn.js";

export default function Header() {
    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('shortly') !== null) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <>
            {loggedIn ? <HeaderLoggedIn/> : <HeaderLoggetOut/>}
        </>
    );
};