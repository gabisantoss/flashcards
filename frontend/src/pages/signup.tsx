import { useState } from "react";
import { useRouter } from "next/router";

import PageLayout from "@/components/layouts/PageLayout";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    if (!res.ok) {
      setError("Erro ao registrar usuário");
      return;
    }

    router.push("/login");
  };

  return (
    <PageLayout>
      <main className="w-lg m-auto">
        <h1 className="text-3xl mb-10 text-neutral-700">Sign Up</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-neutral-300 rounded-md p-2 outline-0 placeholder-neutral-500 placeholder:text-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-neutral-300 rounded-md p-2 outline-0 placeholder-neutral-500 placeholder:text-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full border border-neutral-300 rounded-md p-2 outline-0 placeholder-neutral-500 placeholder:text-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-black hover:bg-neutral-900 text-white p-2 rounded cursor-pointer"
            type="submit"
          >
            Registrar
          </button>
          <p className="text-xs text-neutral-500 text-center">
            Already has an account?{" "}
            <Link href="/login" className="font-bold text-violet-800">
              Login.
            </Link>
          </p>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </main>
    </PageLayout>
  );
}
