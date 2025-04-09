import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Flashcard from "./Flashcard";
import { IFlashcard } from "../hooks/useFlashcards";

function Arrow(props) {
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

const FlashcardCarousel: React.FC<IFlashcard[]> = ({ flashcards }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    infinite: false,
  };
  return (
    <Slider {...settings}>
      {flashcards.map((flashcard) => {
        console.log(flashcard);
        return <Flashcard key={flashcard.id} flashcard={flashcard} />;
      })}
    </Slider>
  );
};

export default FlashcardCarousel;
