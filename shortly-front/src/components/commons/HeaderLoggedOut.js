import styled from "styled-components";
import { Link } from "react-router-dom";

export default function HeaderLoggetOut() {

    return (
        <Main>
            <Navbar>
                <Link to="/signin">
                    <span>Entrar</span>
                </Link>
                <Link to="/signup">
                    <span>Cadastrar-se</span>
                </Link>
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
    
    span {
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #9C9C9C;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
`;

const Navbar = styled.div`
    display: inline-flex;
    justify-content: right;
    align-items: center;
    width: 1017px;
    gap: 20px;
`;