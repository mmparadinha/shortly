import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { getRanking } from "../../services/shortly";
import Header from "../commons/Header";
import { BsTrophyFill } from "react-icons/bs";
import Ranking from "./Ranking";

function RankPage() {
    const [ ranking, setRanking ] = useState([])
    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('shortly') !== null) {
            setLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        getRanking()
            .then(res => {
                setRanking(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <Main>
            <Header />

            <Title>
                <Trophy />
                <h2>Ranking</h2>
            </Title>

            <Box>
                {ranking && ranking.length !== 0 ? ranking.map((data, index) => <Ranking data={data} pos={index} key={index}/>) : 'Ninguém usou meu site :('}
            </Box>

            {loggedIn ? '' : <Container><h2>Crie sua conta no topo para usar nosso serviço!</h2></Container>}

        </Main>
    );
}

export default RankPage;

const Main = styled.div`
    min-height: 100vh;
    width: 1017px;
    margin: 130px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;

    h2 {
        font-size: 36px;
        font-weight: 700;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-top: 150px;
    gap: 10px;
`;

const Trophy = styled(BsTrophyFill)`
    color: goldenrod;
    font-size: 36px;
`;

const Box = styled.div`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin-top: 57px;
    border: 1px solid rgba(120, 177, 89, 0.25);
    border-radius: 24px 24px 0px 0px;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
`;

const Container = styled.div`
    text-align: center;
    margin-top: 82px;
`;