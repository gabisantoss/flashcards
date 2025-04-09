import { useEffect, useState } from "react";

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
        const response = await fetch("/api/flashcards");
        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data["error"];

          setError({
            code: response.status,
            message:
              errorMessage ||
              "An unexpected error occurred while fetching flashcards.",
          });

          return;
        }

        const flashcards = data["flashcards"] as IFlashcard[];
        setFlashcards(flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", JSON.stringify(error));
        setError({
          code: 500,
          message:
            "There was an issue connecting to the server. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    getFlashcards();
  }, []);

  return { flashcards, loading, error };
};
