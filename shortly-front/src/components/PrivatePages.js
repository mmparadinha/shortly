import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivatePages() {
    const navigate = useNavigate();
    let token = null;

    function getToken() {
        const session = localStorage.getItem('shortly');
        if (session) {
            return JSON.parse(session).token;
        } else {
            return null;
        }
    }

    useEffect(() => {
        token = getToken();
    }, []);

    return (
        <>
            {token !== null ? <Outlet/> : navigate('/ranking')}
        </>
    );
};

export default PrivatePages;