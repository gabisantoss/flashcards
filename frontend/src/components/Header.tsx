import FlashcardsIcon from "./icons/FlashcardsIcon";
import Link from "next/link";

export default function Header() {
  return (
    <header className="text-neutral-900 p-4 text-xl">
      <Link href="/">
        <div className="flex items-center gap-3 w-fit cursor-pointer">
          <FlashcardsIcon />
          Flashcards App
        </div>
      </Link>
    </header>
  );
}
