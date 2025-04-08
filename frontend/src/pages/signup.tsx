import { useState } from "react";
import { useRouter } from "next/router";

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
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4 font-bold">Sign-up</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-64">
        <input
          type="text"
          placeholder="Username"
          className="border p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-600 text-white p-2 rounded cursor-pointer"
          type="submit"
        >
          Registrar
        </button>
        <span className="text-sm text-gray-500">
          Already has an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </span>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
