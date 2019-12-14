import styled from "styled-components";

export const TeamSection = styled.section`
  text-align:center;
  background: ${({ theme }) => theme.colors.special};
  margin: 0 -24px;
  padding: 24px 24px 10px;
`;


export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.gray.COLOR_2};
  font-size: ${({ theme }) => theme.sizes.title.SIZE_4};
`;


export const Description = styled.p`
  font-size: ${({ theme }) => theme.sizes.text.SIZE_3};
`;

export const Members = styled.ul`
  list-style:none;
  padding: 0;
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  align-items:center;
  justify-content: space-between;

`;

export const Member = styled.li`
  max-width: 46%;
  margin: 20px 0;
  text-align:left;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 100%;
  margin: auto;
`;

export const MemberName = styled.h4`
  color: ${({ theme }) => theme.colors.secondary};
  margin: 15px 0 0;
  width: 100%;
`;


export const MemberPosition = styled.p`
  margin: 5px 0 10px;
  width: 100%;
  font-size:${({ theme }) => theme.sizes.text.SIZE_3};
`;


