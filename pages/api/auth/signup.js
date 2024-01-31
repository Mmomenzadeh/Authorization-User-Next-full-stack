import ConectToDb from "@/configs/db";
import userModel from "@/model/userModel";
import { GenerateToken, HashPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  } else {
    try {
      ConectToDb();
      const { firstName, lastName, email, userName, password } = req.body;

      // isUserExist =>ok
      // HashPassword =>ok
      // GenerateToken =>ok
      // create user => ok

      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !userName.trim() ||
        !password.trim()
      ) {
        return res.status(422).json({"entery is not valid !" : res});
      } else {
        const isUserExist = await userModel.findOne({
          $or: [{ userName }, { email }],
        });

        if (isUserExist) {
          return res
            .status(422)
            .json({ "message => ": "This email or username exist already !!" });
        }

        const users = await userModel.find({});

        const hashedPassword = await HashPassword(password);
        const token = GenerateToken({ email });

        await userModel.create({
          firstName,
          lastName,
          email,
          userName,
          password: hashedPassword,
          role: users.length > 0 ? "USER" : "ADMIN",
        });
        return res
          .setHeader(
            "set-Cookie",
            serialize("token", token, {
              httpOnly: true,
              path: "/",
              maxAge: 60 * 60 * 12,
            })
          )
          .status(201)
          .json({ "user successfully created": "" });
      }
    } catch (error) {
      // console.log(error);
      return res
        .status(500)
        .json({ "message : internal server error =====> ": error });
    }
  }
};

export default handler;
