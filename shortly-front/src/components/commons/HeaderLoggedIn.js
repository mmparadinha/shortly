import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderLoggetIn() {
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('shortly');
        navigate("/ranking");
    }

    return (
        <Main>
            <Navbar>
                <div>
                    <p>Seja bem-vindo(a), USERNAME!</p>
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
        </Main>
    );
};

const Main = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
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