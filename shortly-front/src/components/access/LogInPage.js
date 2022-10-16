import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../commons/Loading";
import { postLogin } from "../../services/shortly";
import Header from "../commons/Header";

function LogInPage() {
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (localStorage.getItem('shortly') !== null) {
            navigate('/');
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
                    token: resposta.data.token,
                    username: resposta.data.username
                }));
                navigate('/');
                })
            .catch(erro => {
                alert('Não foi possível logar, tente novamente');
                console.log(erro);
                resetForm();
            });
    };

    return (
        <Main>
            <Header />

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
    min-height: 100vh;
    width: 1017px;
    margin: 130px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
`;

const Box = styled.form`
    width: 769px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 130px;
`;

const Input = styled.input`
    width: 100%;
    height: 60px;
    font-weight: 400;
    font-size: 14px;
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);

    &::placeholder {
        color: #9C9C9C;
    }

    &:disabled {
        background-color: #F2F2F2;
        color: #D4D4D4;
    }
`;

const Button = styled.button`
    background-color: #5D9040;
    width: 182px;
    height: 60px;
    margin-top: 37px;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
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