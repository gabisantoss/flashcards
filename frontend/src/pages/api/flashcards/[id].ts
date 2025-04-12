import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "PATCH") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;
  const cookieStore = req.cookies;
  const access_token = cookieStore["access_token"];

  if (!access_token) {
    return res
      .status(401)
      .json({ error: "You need to be authenticated to update the flashcard." });
  }

  const url = process.env.NEXT_PUBLIC_FLASK_API_URL;

  try {
    await axios.patch(`${url}/users/flashcards/${id}`, req.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return void res.status(204).end();
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const response = error.response;

      if (response) {
        if (
          response.data?.message &&
          response.data.message.includes("Token has expired")
        ) {
          res.setHeader(
            "Set-Cookie",
            "access_token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
          );
          return res.status(401).json({
            redirect: true,
            location: "/login?message=disconnected",
            message: response.data.message,
          });
        }
        return res.status(response.status).json({
          error: response.data?.message || "Failed to retrieve data.",
        });
      }
    }

    return res
      .status(500)
      .json({
        error:
          "An error occurred while trying to register the user. Please try again later.",
      });
  }
}
