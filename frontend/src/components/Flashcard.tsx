import React, { useState } from "react";
import { IFlashcard } from "../hooks/useFlashcards";
import FlipIcon from "./icons/FlipIcon";
import CheckboxIcon from "./icons/CheckboxIcon";

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
        className={`flex flex-col justify-center items-center bg-neutral-100 text-neutral-800 border-t border-l border-r border-gray-300 text-lg text-center min-h-80 duration-500 rounded-t-lg ${
          flip ? "rotate-y-180 " : "rounded-b-lg border-b"
        }`}
      >
        <div
          className={`p-4 flex text-xs text-gray-500 w-full ${
            flip ? "rotate-y-180" : "justify-end"
          }`}
          onClick={() => setFlip(!flip)}
        >
          <div className="flex items-center gap-2 cursor-pointer font-bold">
            <p>Flip</p>
            <FlipIcon fill="#64748b" />
          </div>
        </div>
        <div
          className={`grow-1 content-center transform-3d ${
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
        <button
          className={`hover:bg-violet-700 flex items-center gap-2 justify-center bg-violet-800 cursor-pointer text-white border-b border-y border-gray-200 w-full rounded-b-lg p-4 justify-self-end text-center rotate-y-180 ${
            flip ? "block" : "invisible"
          }`}
        >
          <CheckboxIcon fill="#fff" />
          {flashcard.status === "to-study"
            ? "Mark as learned"
            : "Mark as to-study"}
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
