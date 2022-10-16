import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

function PrivatePages() {
    const navigate = useNavigate();
    const { token } = JSON.parse(localStorage.getItem('mywallet'));

    useEffect(() => {
        if (token === null) {
            alert('Não autorizado, favor refazer o login');
            localStorage.clear('mywallet');
            navigate('/');
        }},
    []);

    return (
        <>
            {token !== null ? <Outlet/> : navigate('/')}
        </>
    );
};

export default PrivatePages;