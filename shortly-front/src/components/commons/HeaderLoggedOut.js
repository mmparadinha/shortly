import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiShorts } from "react-icons/gi";

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
`;

const Navbar = styled.div`
    display: inline-flex;
    justify-content: right;
    align-items: center;
    width: 1017px;
    gap: 20px;
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