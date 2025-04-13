import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Flashcard from "./Flashcard";
import { IFlashcard } from "../hooks/useFlashcards";
import { useFlashcardContext } from "@/context/FlashcardContext";

interface IArrow {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function Arrow(props: IArrow) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        fontSize: "150px",
        width: "50px",
        height: "50px",
      }}
      onClick={onClick}
    />
  );
}

const FlashcardCarousel: React.FC = () => {
  const { flashcards } = useFlashcardContext();

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    infinite: false,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };
  return (
    <Slider {...settings}>
      {flashcards.map((flashcard: IFlashcard) => (
        <Flashcard key={flashcard.id} flashcard={flashcard} />
      ))}
    </Slider>
  );
};

export default FlashcardCarousel;
