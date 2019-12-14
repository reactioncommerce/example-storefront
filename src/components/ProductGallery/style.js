import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import Slider from "react-slick";
import { breakpoints } from "../../helpers/constants";

export const Image = styled.img`
    height: auto;
    width: 100%;
    max-width: 100%;
    @media (min-width: ${breakpoints.md}) {
        height: 100%;
    }
`;

export const ImageCol = styled.div`
    height: 438px;
    max-height: 438px;
    overflow: hidden;
    @media (min-width: ${breakpoints.md}) {
        height: 667px;
        max-height: 667px;
        max-width:488px;
        border-radius: 20px;
        padding: 1px;
        img {
   
        }

    }

`;

export const ControlBox = styled.div`

    overflow:hidden;
`;

export const StyledControl = styled.img`
    width: 100%;
    height: auto;
`;

export const StyledRow = styled(Row)`
    list-style:none;
    padding: 0;
`;

export const StyledSlider = styled(Slider)`
    width: 100%;
    list-style:none;
    padding: 0;

    .slick-dots {
        bottom: 20px;
    }
    .slick-dots li button:before {
        color: #fff;
    }
    .slick-dots li.slick-active button:before {
        color: #fff;
        transform: scale(1.3)
    }
    .slick-prev {
        left:0;

    }
    .slick-next {
        right:0;
        
    }
    .slick-prev, .slick-next {
        z-index: 6;
        margin: 0 5px;
    }

    @media (min-width: ${breakpoints.md}) {
        max-width:488px;
        .slick-dots {
            position: relative;
            bottom: 0!important;
        }
        .slick-dots li {
            width: 90px;
            height: 90px;
            overflow: hidden;
        }
    }
`;
