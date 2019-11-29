import styled from "styled-components";

export const Carousel = styled.section`

`;
export const Slider = styled.ol`
    padding:0;
    list-style:none;
`;

export const Slide = styled.li`
    width: 100%;
    text-align:left;
`;

export const SlideTitle = styled.h3`
   color: ${({ theme }) => theme.colors.gray.COLOR_4};
`;

export const SlideDescription = styled.p`
   color: ${({ theme }) => theme.colors.gray.COLOR_4};
`;

export const Image = styled.img`
    height: auto;
    width: 100%;
    border-radius: 20px;

`;

export const Controls = styled.ul`
    display:flex;
    width: 100%;
    padding:0;
    list-style:none;
    max-width: 70px;
    margin: 0 auto;
    flex-direction:row;
    align-items:center;
    justify-content: space-around;
`;

export const ControlItem = styled.li`
    width: 10px;
    height:10px;
    border-radius:100%;
    background: ${({ theme, active }) => (active ? theme.colors.gray.COLOR_2 : theme.colors.gray.COLOR_4)}
`;

