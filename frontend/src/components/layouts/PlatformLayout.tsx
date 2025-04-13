import Sidebar from "@/components/Sidebar";
import { useFlashcards } from "@/hooks/useFlashcards";
import PageLayout from "./PageLayout";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import { FlashcardContext } from "@/context/FlashcardContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { flashcards, error, loading } = useFlashcards();

  if (loading) {
    return (
      <PageLayout>
        <LoadingSpinner />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <ErrorMessage message={error?.message || "An unknown error occurred"} />
      </PageLayout>
    );
  }
  return (
    <FlashcardContext.Provider value={{ flashcards }}>
      <div className="flex w-full h-screen">
        <Sidebar />
        <div className="w-3/4 flex flex-col justify-center p-6">{children}</div>
      </div>
    </FlashcardContext.Provider>
  );
}
