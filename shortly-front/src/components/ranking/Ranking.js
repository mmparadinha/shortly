import React from "react";
import styled from "styled-components";

export default function Ranking({ data, pos }) {
    const rankCorrection = 1;

    return(
        <ContentContainer>
            <span>{pos+rankCorrection}. {data.name} - {data.linksCount} links - {data.visitCount} visualizações</span>
        </ContentContainer>
    )
}

const ContentContainer = styled.div`
    color: #000000;
    font-weight: 400;
    font-size: 22px;

    span {
        cursor: default;
    }
`;

