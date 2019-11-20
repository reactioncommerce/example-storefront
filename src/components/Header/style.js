import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`;

export const TemplateName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9c27b1;
  width: 100%;
  height: 23px;
`;

export const Title = styled.span`
  font-size: 11px;
  color: white;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 63px;
  padding: 0px 25px;
`;

export const Logo = styled.img`
  height: 52px;
  width: 155px;
`;

export const ToggleButton = styled.button`
  border: none;
  background: transparent;
  padding: 0px;
`;
