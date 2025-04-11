import FlashcardCarousel from "@/components/FlashcardCarousel";
import { useFlashcards } from "@/hooks/useFlashcards";
import PlatformLayout from "@/components/layouts/PlatformLayout";
import PageLayout from "@/components/layouts/PageLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function PlatformPage() {
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
    flashcards && (
      <PlatformLayout>
        <FlashcardCarousel flashcards={flashcards} />
      </PlatformLayout>
    )
  );
}
