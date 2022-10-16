import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiShorts } from "react-icons/gi";

export default function HeaderLoggetIn() {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('shortly') !== null) {
            const temp = JSON.parse(localStorage.getItem('shortly')).username;
            setUsername(temp);
        }
    }, []);

    function logOut() {
        console.log('a')
        localStorage.removeItem('shortly');
        window.location.reload();
        navigate("/ranking");
    }

    return (
        <Main>
            <Navbar>
                <div>
                    <p>Seja bem-vindo(a), {username}!</p>
                </div>
                <div>
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                    <Link to="/ranking">
                        <span>Ranking</span>
                    </Link>
                    <span onClick={logOut}>Sair</span>
                </div>
            </Navbar>
            <Title>
                <h1>Shortly</h1>
                <ShortlyLogo />
            </Title>
        </Main>
    );
};

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    gap: 20px;
    top: 60px;
    left: 0;
    z-index: 1;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 14px;
    
    span {
        color: #9C9C9C;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }

    p {
        color: #5D9040;
    }
`;

const Navbar = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 1017px;

    div {
        display: flex;
        gap: 20px;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    h1 {
        font-weight: 200;
        color: #000000;
        font-size: 64px;
    }
`;

const ShortlyLogo = styled(GiShorts)`
    color: #78B159;
    font-size: 96px;
`;