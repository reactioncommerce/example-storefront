import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import Slider from "react-slick";

export const Image = styled.img`
   height: auto;
    width: 100%;
    max-width: 100%;
`;

export const ImageCol = styled.div`
    height: 438px;
    overflow: hidden;
`;

export const StyledRow = styled(Row)`
    height: 438px;
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
`;
