import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../commons/Loading";
import { postLogin } from "../../services/shortly";

function LogInPage() {
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (localStorage.getItem('shortly') !== null) {
            navigate('/home');
        }
    }, [navigate]);

    function updateInput(e) {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    function resetForm() {
        setLogin({
            email: "",
            password: ""
        });
        setSending(false);
    }

    function logIn(e) {
        e.preventDefault();
        setSending(true);
        postLogin(login)
            .then(resposta => {
                localStorage.setItem('shortly', JSON.stringify({
                    userId: resposta.data.userId,                    
                    token: resposta.data.token,
                    username: resposta.data.username
                }));
                navigate('/home');
                })
            .catch(erro => {
                alert('Não foi possível logar, tente novamente');
                console.log(erro);
                resetForm();
            });
    };

    return (
        <Main>
            <Link to="/">
                <h3>
                    Entrar
                </h3>
            </Link>
            <h3>
                Cadastrar-se
            </h3>

            <img src="%PUBLIC_URL%/assets/logo.png" alt="shortly logo" />

            <Box onSubmit={logIn}>
                <Input
                    disabled={sending}
                    required
                    type='email'
                    name='email'
                    value={login.email}
                    onChange={updateInput}
                    placeholder='E-mail'
                />
                <Input
                    disabled={sending}
                    required
                    type='password'
                    name='password'
                    value={login.password}
                    onChange={updateInput}
                    placeholder='Senha'
                />
                <Button type='submit' disabled={sending}> {sending ? <Loading /> : 'Entrar'} </Button>
            </Box>

        </Main>
    );
}

export default LogInPage;

const Main = styled.div`
    background-color: purple;
    min-height: 100vh;
    margin: auto;
    padding: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 32px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }

    h3 {
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 700;
        font-size: 15px;
        color: #FFFFFF;
        margin-top: 36px;
        text-align: center;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }

        &:disabled {
            opacity: 0.8;
            cursor: default;
        }
    }
`;

const Box = styled.form`
    width: 769px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
`;

const Input = styled.input`
    width: 100%;
    height: 58px;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    padding: 10px;
    border-radius: 5px;

    &::placeholder {
        color: #000000;
        opacity: 0.8;
    }

    &:disabled {
        background-color: #F2F2F2;
        color: #D4D4D4;
    }
`;

const Button = styled.button`
    background-color: #A328D6;
    width: 100%;
    height: 46px;
    border: none;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #FFFFFF;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        filter: brightness(1.2);
        cursor: pointer;
    }
    
    &:disabled {
        filter: brightness(0.7);
        cursor: default;
    }
`;