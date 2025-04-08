import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const url = process.env.FLASK_API_URL;

  try {
    const flaskRes = await fetch(`${url}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!flaskRes.ok)
      return res.status(401).json({ message: "Credenciais inválidas" });

    const { access_token } = await flaskRes.json();

    res.setHeader(
      "Set-Cookie",
      serialize("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    res.status(200).json({ message: "Autenticado com sucesso" });
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    res.status(500).json({ message: "Erro ao autenticar" });
  }
}
