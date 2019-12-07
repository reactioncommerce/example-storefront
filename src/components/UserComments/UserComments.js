import React from "react";
import Slider from "react-slick";
import { Hidden } from "@material-ui/core";
import * as s from "./style";

const comments = [
  {
    name: "Usuário 1",
    info: "Teste",
    image: "../../static/images/users/user.png",
    comment:
      "“Sed ut perspiciatis unde omnis iste natus inum orit  a error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. "
  },
  {
    name: "Usuário 2",
    info: "Teste",
    image: "../../static/images/users/user.png",
    comment:
      "“Sed ut perspiciatis unde omnis iste natus inum orit  a error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. "
  },
  {
    name: "Usuário 3",
    info: "Teste",
    image: "../../static/images/users/user.png",
    comment:
      "“Sed ut perspiciatis unde omnis iste natus inum orit  a error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. "
  },
  {
    name: "Usuário 3",
    info: "Teste",
    image: "../../static/images/users/user.png",
    comment:
      "“Sed ut perspiciatis unde omnis iste natus inum orit  a error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. "
  }
];

const mobileSettings = {
  className: "center",
  centerMode: true,
  infinite: false,
  centerPadding: "10px",
  slidesToShow: 1,
  speed: 500
};

const desktopSettings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "10px",
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 500
};

const UserComments = () => {
  return (
    <s.Section>
      <s.Header>
        <s.Title>Lorem Ipsum</s.Title>
      </s.Header>

      <Hidden mdUp>
        <s.SliderContainer>
          <Slider {...mobileSettings}>
            {comments &&
              comments.length &&
              comments.map((comm, idx) => {
                return (
                  <s.CommentCard className="comment-card-item" key={idx}>
                    <s.ImageBorder>
                      <s.UserImage src={comm.image} />
                    </s.ImageBorder>
                    <s.CommentBody>
                      <s.Text>{comm.comment}</s.Text>
                      <s.CardFooter>
                        <s.Name>{comm.name}</s.Name>
                        <s.Info>{comm.info}</s.Info>
                      </s.CardFooter>
                    </s.CommentBody>
                  </s.CommentCard>
                );
              })}
          </Slider>
        </s.SliderContainer>
      </Hidden>

      <Hidden smDown>
        <s.Header>
          <s.SubTitle>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </s.SubTitle>
        </s.Header>
        
        
        <s.SliderContainer>
          <Slider {...desktopSettings}>
            {comments &&
              comments.length &&
              comments.map((comm, idx) => {
                return (
                  <s.CommentCard className="comment-card-item" key={idx}>
                    <s.ImageBorder>
                      <s.UserImage src={comm.image} />
                    </s.ImageBorder>
                    <s.CommentBody>
                      <s.Text>{comm.comment}</s.Text>
                      <s.CardFooter>
                        <s.Name>{comm.name}</s.Name>
                        <s.Info>{comm.info}</s.Info>
                      </s.CardFooter>
                    </s.CommentBody>
                  </s.CommentCard>
                );
              })}
          </Slider>
        </s.SliderContainer>

      </Hidden>
    </s.Section>
  );
};

export default UserComments;
