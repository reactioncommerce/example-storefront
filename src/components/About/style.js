import styled from "styled-components";

export const AboutSection = styled.section`
  text-align:center;
  padding: 30px 0;
`;


export const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray.COLOR_2};
  text-align:center;
  width: 100%;
`;


export const PageSubtitle = styled.p`
  text-align:center;
  width: 100%;
  margin-bottom: 30px;
  
`;


export const ItemTitle = styled.h3`
  font-size:${({ theme }) => theme.sizes.text.SIZE_1};
  text-align: left;
`;


export const ItemDescription = styled.p`
  text-align: left;
  margin-bottom: 30px;
  
`;



export const ItemImage = styled.img`
  max-width:325px;
`;

