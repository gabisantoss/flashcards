import { useFlashcardContext } from "@/context/FlashcardContext";
import { IFlashcard } from "@/hooks/useFlashcards";
import { useState } from "react";
import VisibleIcon from "./icons/VisibleIcon";
import InvisibleIcon from "./icons/InvisibleIcon";

const FlashcardsTable: React.FC = () => {
  const { flashcards } = useFlashcardContext();
  const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>(
    {}
  );

  const [statusFilter, setStatusFilter] = useState<
    "all" | "to-study" | "studied"
  >("all");

  const filteredFlashcards = flashcards.filter((flashcard: IFlashcard) =>
    statusFilter === "all" ? true : flashcard.status === statusFilter
  );

  const toggleAnswerVisibility = (id: number) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="relative overflow-x-auto rounded-lg ">
      <div className="mb-4">
        <label
          htmlFor="statusFilter"
          className="mr-2 text-sm font-medium text-gray-700"
        >
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | "to-study" | "studied")
          }
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          <option value="all">All</option>
          <option value="to-study">To Study</option>
          <option value="studied">Studied</option>
        </select>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-neutral-50 bg-violet-800 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Question
            </th>
            <th scope="col" className="px-6 py-3">
              Answer
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredFlashcards.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center px-6 py-4 bg-white text-gray-800"
              >
                No results found.
              </td>
            </tr>
          ) : (
            filteredFlashcards.map((flashcard: IFlashcard) => (
              <tr
                key={flashcard.id}
                className="bg-white border-b border-gray-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">
                  {flashcard.question}
                </td>
                <td className="px-6 py-4 flex items-center gap-2 whitespace-nowrap">
                  <span
                    className={visibleAnswers[flashcard.id] ? "" : "blur-sm"}
                  >
                    {flashcard.answer}
                  </span>
                  <button
                    onClick={() => toggleAnswerVisibility(flashcard.id)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {visibleAnswers[flashcard.id] ? (
                      <InvisibleIcon />
                    ) : (
                      <VisibleIcon />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">{flashcard.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlashcardsTable;
