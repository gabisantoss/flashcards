import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, username, password } = req.body;

  const url = process.env.FLASK_API_URL;

  console.log(url);

  try {
    const flaskRes = await fetch(`${url}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    if (!flaskRes.ok)
      return res.status(400).json({ message: "Erro ao registrar" });

    res.status(200).json({ message: "Usuário registrado" });
  } catch {
    res.status(500).json({ message: "Erro interno" });
  }
}
