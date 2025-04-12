import React, { useState } from "react";

import { IFlashcard } from "../hooks/useFlashcards";
import FlipIcon from "./icons/FlipIcon";
import FlashcardStatusButton from "./FlashcardStatusButton";

interface FlashcardProps {
  flashcard: IFlashcard;
  key: number;
}

const Flashcard: React.FC<FlashcardProps> = ({ key, flashcard }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div className="max-w-lg m-auto">
      <div
        key={key}
        className={`flex flex-col justify-center items-center bg-neutral-100 text-neutral-800 border border-gray-300 text-lg text-center min-h-80 duration-500 rounded-lg ${
          flip ? "rotate-y-180 " : "rounded-b-lg border-b"
        }`}
      >
        <div
          className={`pt-4 flex text-xs text-gray-500 w-full ${
            flip ? "rotate-y-180 pl-4" : "pr-4 justify-end"
          }`}
        >
          <div
            className="flex items-center gap-2 cursor-pointer font-bold w-fit"
            onClick={() => setFlip(!flip)}
          >
            <p>Flip</p>
            <FlipIcon fill="#64748b" />
          </div>
        </div>
        <div
          className={`grow-1 px-6 content-center transform-3d ${
            flip ? "rotate-y-180" : ""
          }`}
        >
          <div className={`text-center ${flip ? "hidden" : "block"}`}>
            {flashcard.question}
          </div>
          <div className={`text-center ${flip ? "block" : "hidden"}`}>
            {flashcard.answer}
          </div>
        </div>
      </div>
      <FlashcardStatusButton flashcard={flashcard} />
    </div>
  );
};

export default Flashcard;
