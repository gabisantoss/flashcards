export default function Home() {
  return (
    <main className="m-auto flex min-h-lvh items-center h-full justify-center w-full p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-8xl text-secondary text-center cursor-default">
          Flashcards
        </h1>
        <p className="text-2xl font-bold text-center cursor-default">
          A simple flashcards app.
        </p>
        <button className="mt-4 bg-gray-200 border dark:text-black text-white border-primary text-primary py-2 px-4 rounded-xl">
          <a href="/signup">Get Started</a>
        </button>
      </div>
    </main>
  );
}
