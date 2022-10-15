import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../commons/Loading";
import { postSignUp } from "../../services/shortly";
import Header from "../commons/Header";

function RankPage() {
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const [registration, setRegistration] = useState({
        email: "",
        name: "",
        password: "",
        password_confirmation: ""
    });

    function updateInput(e) {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
    };

    function resetForm() {
        setRegistration({
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
        });
        setSending(false);
    }

    function signUp(e) {
        e.preventDefault(e);
        setSending(true);
        postSignUp(registration)
            .then(() => {
                setSending(false);
                navigate('/');
            })
            .catch(erro => {
                alert('Não foi possível finalizar seu cadastro, tente novamente');
                console.log(erro);
                resetForm();
            });
    };

    return (
        <Main>
            <Header />

            <Title>
                <h1>Shortly</h1>
                <img src="../commons/logo.png" alt="shortly logo" />
            </Title>


            <Box onSubmit={signUp}>
                <Input
                    disabled={sending}
                    required
                    type='text'
                    name='name'
                    value={registration.name}
                    onChange={updateInput}
                    placeholder='Nome'
                />
                <Input 
                    disabled={sending}
                    required
                    type='email'
                    name='email'
                    value={registration.email}
                    onChange={updateInput}
                    placeholder='E-mail'
                />
                <Input 
                    disabled={sending}
                    required
                    type='password'
                    name='password'
                    value={registration.password}
                    onChange={updateInput}
                    placeholder='Senha'
                />
                <Input 
                    disabled={sending}
                    required
                    type='password'
                    name='password_confirmation'
                    value={registration.password_confirmation}
                    onChange={updateInput}
                    placeholder='Confirmar senha'
                />
                <Button type='submit' disabled={sending}> {sending ? <Loading /> : 'Criar conta'} </Button>                    
            </Box>

        </Main>
    );
}

export default RankPage;

const Main = styled.div`
    min-height: 100vh;
    width: 1017px;
    margin: auto;
    padding: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend Deca', sans-serif;

    h3 {
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        text-align: center;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }

        &:disabled {
            opacity: 0.7;
            cursor: default;
        }
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    h1 {
        font-weight: 200;
        font-size: 64px;
        color: #000000;
    }
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