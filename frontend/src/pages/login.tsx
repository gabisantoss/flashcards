import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import PageLayout from "@/components/layouts/PageLayout";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.message === "disconnected") {
      setMessage("You have been logged out. Please log in again.");
    }
  }, [router.query]);

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
    <PageLayout>
      <div className="w-lg m-auto">
        {message && (
          <div className="text-center text-sm mb-10 font-semibold text-neutral-700">
            {message}
          </div>
        )}

        <h1 className="text-3xl mb-4 text-neutral-700">Welcome back</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <h1 className="text-lg text-neutral-700 mb-1">Email</h1>
            <input
              type="email"
              name="email"
              className="w-full border border-neutral-300 rounded-md p-2 outline-0 placeholder-neutral-500 placeholder:text-xs"
              required
            />
          </div>
          <div>
            <h1 className="text-lg text-neutral-700 mb-1">Password</h1>
            <input
              type="password"
              name="password"
              className="w-full border border-neutral-300 rounded-md p-2 outline-0 placeholder-neutral-500 placeholder:text-xs"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            className="bg-black hover:bg-neutral-900 text-white p-2 rounded cursor-pointer"
            type="submit"
          >
            Log In
          </button>
          <p className="text-xs text-neutral-500 text-center">
            Not registered yet?{" "}
            <Link className="font-bold text-violet-800" href="/signup">
              Create an Account.
            </Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
}
