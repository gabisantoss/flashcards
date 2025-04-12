import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, username, password } = req.body;

  const url = process.env.NEXT_PUBLIC_FLASK_API_URL;

  try {
    const flaskRes = await fetch(`${url}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    if (!flaskRes.ok)
      return res.status(400).json({
        message:
          "An error occurred while trying to register the user. Please try again later.",
      });

    res.status(200).json({ message: "User registered successfully!" });
  } catch {
    res.status(500).json({
      message:
        "An error occurred while trying to register the user. Please try again later.",
    });
  }
}
