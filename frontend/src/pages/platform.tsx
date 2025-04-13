import FlashcardCarousel from "@/components/FlashcardCarousel";
import PlatformLayout from "@/components/layouts/PlatformLayout";

export default function PlatformPage() {
  return (
    <PlatformLayout>
      <h2 className="text-2xl font-semibold mb-6 ">Your Flashcards</h2>
      <FlashcardCarousel />
    </PlatformLayout>
  );
}
