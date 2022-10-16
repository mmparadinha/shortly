import React from "react";
import styled from "styled-components";
import { deleteUrl } from "../../services/shortly";
import { RiDeleteBin5Line } from 'react-icons/ri'

export default function Url({ data }) {

    function removeTransaction() {
        if (window.confirm('Você realmente deseja excluir esse link? Também excluiremos o recorde')) {
            deleteUrl(data.id)
                .then(() => document.location.reload())
                .catch(erro => {
                    alert('Não foi possível apagar o seu link');
                    console.log(erro);
            });
        }
    }

    return(
        <Box>
            <ContentContainer>
                <span>{data.url}</span>
                <span>{data.shortUrl}</span>
                <span>Quantidade de visitantes: {data.visitCount}</span>
            </ContentContainer>
            <DeleteContainer>
                <RiDeleteBin5Line onClick={() => removeTransaction()}/>
            </DeleteContainer>
        </Box>
    )
}

const Box = styled.div`
    display: flex;
`;

const ContentContainer = styled.div`
    padding: 10px;
    background-color: #80CC74;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 12px 0px 0px 12px;
    width: 85%;
    height: 60px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: 400;
    font-size: 14px;
`;

const DeleteContainer = styled.div`
    background-color: #FFFFFF;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 0px 12px 12px 0px;
    width: 15%;
    height: 60px;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
`;

