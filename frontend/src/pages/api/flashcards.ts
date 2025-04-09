import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieStore = req.cookies;
  const access_token = cookieStore["access_token"];

  if (!access_token) {
    return res
      .status(401)
      .json({ error: "You need to be authenticated to access the platform." });
  }

  const url = process.env.FLASK_API_URL;

  try {
    const flaskRes = await fetch(`${url}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await flaskRes.json();

    if (!flaskRes.ok) {
      const reqErrorMessage = data["msg"];

      if (reqErrorMessage.includes("Token has expired")) {
        res.setHeader(
          "Set-Cookie",
          "access_token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict"
        );
        res.redirect(302, "/login?message=disconnected");
      }
      return res.status(flaskRes.status).json({ error: data["msg"] });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in API call:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
