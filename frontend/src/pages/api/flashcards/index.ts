import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const cookieStore = req.cookies;
  const access_token = cookieStore["access_token"];

  if (!access_token) {
    return res
      .status(401)
      .json({ error: "You need to be authenticated to access the platform." });
  }

  const url = process.env.NEXT_PUBLIC_FLASK_API_URL;

  try {
    const flaskRes = await axios.get(`${url}/users/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return res.status(200).json(flaskRes.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const response = error.response;

      console.log(response?.data.message);
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
          error:
            response.data?.message ||
            "An error occurred while trying to fetch the flashcards.",
        });
      }
    }

    return res.status(500).json({
      error:
        "An error occurred while trying to register the user. Please try again later.",
    });
  }
}
