import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../commons/Loading";
import { postUrl, getUserUrls } from "../../services/shortly";
import Header from "../commons/Header";
import Url from "./Url";

function LogInPage() {
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const [userUrls, setUserUrls] = useState([])
    const [input, setInput] = useState({
        url: "",
    });

    useEffect(() => {
        getUserUrls()
            .then(res => {
                setUserUrls(res.data.shortenedUrls);
            })
            .catch(error => console.log(error));
    }, []);

    function updateInput(e) {
        setInput({ [e.target.name]: e.target.value });
    };

    function shortenLink(e) {
        e.preventDefault();
        setSending(true);
        postUrl(input)
            .then(() => {
                navigate('/');
                })
            .catch(erro => {
                alert('Não foi possível encurtar, tente novamente');
                console.log(erro);
                setInput("");
                setSending(false);
            });
    }

    return (
        <Main>
            <Header />

            <Box onSubmit={shortenLink}>
                <Input
                    disabled={sending}
                    required
                    type='url'
                    name='url'
                    value={input.url}
                    onChange={updateInput}
                    placeholder='Links que cabem no bolso'
                />
                <Button type='submit' disabled={sending}> {sending ? <Loading /> : 'Encurtar link'} </Button>
            </Box>

            <Container>
                {userUrls && userUrls.length !== 0 ? userUrls.map((data, index) => <Url key={index} data={data}/>) : ''}
            </Container>

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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-top: 130px;
`;

const Input = styled.input`
    width: 769px;
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 59px;
    gap: 42px;
    width: 100%;
`;