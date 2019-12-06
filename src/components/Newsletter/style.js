import styled from "styled-components";


export const Newsletter = styled.section`
    background: ${({ theme }) => theme.colors.gray.COLOR_5};
    margin: 0 -24px;
    padding: 24px;
    text-align:center;
`;

export const Title = styled.h3`

`;

export const Svg = styled.svg`
    fill: #c1c1c1;
    width: 20px;
`;

export const Description = styled.p`
    font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
`;

export const Button = styled.button`
    margin: 20px auto;
`;

