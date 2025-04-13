// context/FlashcardContext.tsx
import { IFlashcard } from "@/hooks/useFlashcards";
import { createContext, useContext } from "react";

type FlashcardContextType = {
  flashcards: IFlashcard[];
};

export const FlashcardContext = createContext<FlashcardContextType | null>(
  null
);

export const useFlashcardContext = () => {
  const context = useContext(FlashcardContext);
  if (!context) {
    throw new Error(
      "useFlashcardContext must be used within a FlashcardProvider"
    );
  }
  return context;
};
