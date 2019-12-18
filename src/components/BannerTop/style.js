import styled from "styled-components";
import { breakpoints } from "../../helpers/constants";

export const Banner = styled.div`
  width: 100vw;
  position: relative;
  margin: 0 -24px;
  max-height: 300px;
  overflow: hidden;
  height: 300px;
  @media (min-width: ${breakpoints.md}) {
    max-height: 360px;
    }
`;

export const Image = styled.img`
  z-index: 0;
  left: 0;
  position: absolute;
  top: 0;
  height: auto;
  width: 100%;
  @media (min-width: ${breakpoints.md}) {
    height: 100%;
    width: auto;
    }
`;
