import ConectToDb from "@/configs/db";
import userModel from "@/model/userModel";
import { VerfiyToken } from "@/utils/auth";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return false;
  }
  try {
    ConectToDb();
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json("you are unauthorized");
    }

    const userPayload = VerfiyToken(token);

    if (!userPayload) {
      return res.status(401).json("you are unauthorized !");
    }

    const userData = await userModel.findOne(
      { email: userPayload.email },
      "firstName lastName role _id"
    );

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json("internall server error !");
  }
};

export default handler;
