import "@/styles/globals.css";

import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/platform");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2"
          required
        />
        <button
          className="bg-primary text-white p-2 rounded cursor-pointer"
          type="submit"
        >
          Sign
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
