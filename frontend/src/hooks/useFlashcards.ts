import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export interface IFlashcard {
  id: number;
  question: string;
  answer: string;
  status: string;
}

export interface RequestError {
  code: number;
  message: string | null;
}

export const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<RequestError | null>(null);

  useEffect(() => {
    const getFlashcards = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api/flashcards");
        setFlashcards(response.data.flashcards);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const response = error.response;

          if (response) {
            if (response.data.redirect) {
              window.location.href = response.data.location;
            }
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
            message: "There was an unexpected error. Please try again later.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getFlashcards();
  }, []);

  return { flashcards, loading, error };
};
