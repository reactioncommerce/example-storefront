import React, { useEffect, useState, useRef } from "react";
import ArrowShape from "../Icons/ArrowShape";
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
  }
];

const UserComments = () => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [widthToMove, setWidthToMove] = useState(0);
  const ref = useRef(null);
  const positionRef = useRef(0);

  const onResize = () => {
    if (positionRef) {
      setSliderPosition(0);
    }
    const width = ref.current ? ref.current.offsetWidth : 0;
    setWidthToMove(width);
  };

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
  }, [ref.current]);

  const changeSliderPosition = (left) => {
    if (!sliderPosition && left) {
      return;
    }

    if (sliderPosition === (comments.length - 1) * -widthToMove && !left) {
      return;
    }

    const position = left ? sliderPosition + widthToMove : sliderPosition - widthToMove;

    setSliderPosition(position);
    positionRef.current = position;
  };

  return (
    <s.Section>
      <s.Title>Lorem Ipsum</s.Title>

      <s.Slider>
        <s.ArrowBlock onClick={() => changeSliderPosition(true)}>
          <ArrowShape />
        </s.ArrowBlock>
        <s.Comments>
          {comments &&
            comments.length &&
            comments.map((c, idx) => {
              return (
                <s.CommentCard key={idx} innerRef={ref} className="comment-card" position={`${sliderPosition}px`}>
                  <s.ImageBorder>
                    <s.UserImage src={c.image} />
                  </s.ImageBorder>
                  <s.CommentBody>
                    <s.Text>{c.comment}</s.Text>
                    <s.CardFooter>
                      <s.Name>{c.name}</s.Name>
                      <s.Info>{c.info}</s.Info>
                    </s.CardFooter>
                  </s.CommentBody>
                </s.CommentCard>
              );
            })}
        </s.Comments>
        <s.ArrowBlock onClick={() => changeSliderPosition(false)}>
          <ArrowShape direction="right" />
        </s.ArrowBlock>
      </s.Slider>
    </s.Section>
  );
};

export default UserComments;