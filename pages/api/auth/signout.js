import { VerfiyToken } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return false;
  }

  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(422).json("token is not valid");
    }

    const payloadToken = VerfiyToken(token);

    if (!payloadToken) {
      return res.status(422).json("token is not valid");
    }
    return res
      .setHeader(
        "set-Cookie",
        serialize("token", token, {
          path: "/",
          maxAge: 0,
        })
      )
      .status(200)
      .json("successfully logOut");
  } catch (error) {
    return res.status(500).json("unknown server error !");
  }
};

export default handler;
