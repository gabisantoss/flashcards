import { IFlashcard, RequestError } from "@/hooks/useFlashcards";
import CheckboxIcon from "./icons/CheckboxIcon";
import FilledCheckboxIcon from "./icons/FilledCheckboxIcon";
import { useState } from "react";
import axios, { AxiosError } from "axios";

interface IFlashcardStatusButton {
  flashcard: IFlashcard;
}

const FlashcardStatusButton: React.FC<IFlashcardStatusButton> = ({
  flashcard,
}) => {
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
    <>
      {error && (
        <div className="mt-2 text-sm text-red-600">{error.message}</div>
      )}
      <div className="mt-2 pr-2 text-sm flex text-md items-center gap-2 text-neutral-900 w-full rounded-b-lg justify-end">
        <button className="" onClick={updateFlashcardStatus} disabled={loading}>
          {status === "to-study" ? (
            <CheckboxIcon cursor="pointer" fill="#000" />
          ) : (
            <FilledCheckboxIcon cursor="pointer" fill="#4CBB17" />
          )}
        </button>
        <span>{status === "to-study" ? "Mark as Learned" : "Learned"}</span>{" "}
      </div>
    </>
  );
};

export default FlashcardStatusButton;
