import React from "react";
import Button from "@material-ui/core/Button";
import * as styles from "./style";

const SpecificProduct = () => {
  return (
    <styles.Section>
      <styles.MainImage alt={"Highlight"} src={"../../static/images/home/destaque.png"} />

      <styles.InnerContent>
        <styles.Title>Lorem Ipsum</styles.Title>
        <styles.Text>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </styles.Text>
        {/* <Button color="primary" href="/profile/address">
          Profile
        </Button> */}
      </styles.InnerContent>
    </styles.Section>
  );
};

export default SpecificProduct;
