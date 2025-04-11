import React, { useState } from "react";
import { IFlashcard, RequestError } from "../hooks/useFlashcards";
import FlipIcon from "./icons/FlipIcon";
import CheckboxIcon from "./icons/CheckboxIcon";
import FilledCheckboxIcon from "./icons/FilledCheckboxIcon";
import axios, { AxiosError } from "axios";

interface FlashcardProps {
  flashcard: IFlashcard;
  key: number;
}

const Flashcard: React.FC<FlashcardProps> = ({ key, flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [status, setStatus] = useState(flashcard.status);
  const [error, setError] = useState<RequestError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateFlashcardStatus = async () => {
    const updatedStatus = status === "to-study" ? "studied" : "to-study";
    setStatus(updatedStatus);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`/api/flashcards/${flashcard.id}`, {
        status: updatedStatus,
      });

      if (response.status !== 204) {
        console.error("Failed to update flashcard", response);
        setStatus(status);
        setError({
          code: response.status,
          message: "An unexpected error occurred while updating the flashcard.",
        });
      }
    } catch (error: unknown) {
      setStatus(status);

      if (error instanceof AxiosError) {
        const response = error.response;

        if (response) {
          const errorMessage =
            response.data.error || "An unexpected error occurred.";

          setError({
            code: response.status,
            message: errorMessage,
          });
        } else {
          setError({
            code: 500,
            message:
              "There was an issue connecting to the server. Please try again later.",
          });
        }
      } else {
        console.error("Unexpected error:", error);
        setError({
          code: 500,
          message:
            "There was an issue updating the flashcard. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

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

      {error && (
        <div className="mt-2 text-sm text-red-500">{error.message}</div> // Display error message if any
      )}

      <button
        className="mt-2 pr-2 text-sm flex text-md items-center gap-2 text-neutral-900 w-full rounded-b-lg justify-end"
        onClick={updateFlashcardStatus}
        disabled={loading}
      >
        {status === "to-study" ? (
          <>
            <CheckboxIcon cursor="pointer" fill="#000" />
            <span>Mark as Learned</span>{" "}
          </>
        ) : (
          <>
            <FilledCheckboxIcon cursor="pointer" fill="#4CBB17" />
            <span>Learned</span>{" "}
          </>
        )}
      </button>
    </div>
  );
};

export default Flashcard;
