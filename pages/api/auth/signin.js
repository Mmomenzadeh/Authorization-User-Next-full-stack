import ConectToDb from "@/configs/db";
import userModel from "@/model/userModel";
import { GenerateToken, VerifyPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    ConectToDb();
    const { identifier, password } = req.body;

    if (!identifier.trim() || !password.trim()) {
      return res.status(422).json("entery is not valid !");
    }

    const user = await userModel.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });

    if (!user) {
      // console.log("ok");
      return res.status(404).json("user is not found !");
    }

    const validPassword = await VerifyPassword(password, user.password);

    // console.log(validPassword);

    if (!validPassword) {
      return res.status(404).json("user or password is not found");
    }

    const token = GenerateToken({ email: user.email });
    return res
      .setHeader(
        "set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 12,
        })
      )
      .status(200)
      .json("sucssfully login");
  } catch (error) {
    return res
      .status(500)
      .json({ "message ====> internal server error  ": error });
  }
};

export default handler;
