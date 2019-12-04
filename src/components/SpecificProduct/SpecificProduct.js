import React from "react";
import Button from "../Button";
import * as s from "./style";

const SpecificProduct = () => {
  return (
    <s.Section>
      <s.MainImageContainer>
        <s.MainImage alt={"Highlight"} src={"../../static/images/home/destaque.png"} />
      </s.MainImageContainer>

      <s.InnerContent>
        <s.Title>Lorem Ipsum</s.Title>
        <s.Text>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </s.Text>
        <Button href="/" primary customStyles={{ marginTop: "20px" }}>
          Comprar
        </Button>
      </s.InnerContent>
    </s.Section>
  );
};

export default SpecificProduct;
