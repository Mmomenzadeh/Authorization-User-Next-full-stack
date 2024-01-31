import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const HashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const VerifyPassword = async (password, hashedPassword) => {
  const res = await compare(password, hashedPassword);
  return res;
};

//////

const GenerateToken = (data) => {
  const token = sign({ ...data }, process.env.privateKey, { expiresIn: "12h" });

  return token;
};

// It actually decodes the token
const VerfiyToken = (token) => {
  try {
    const decoded = verify(token, process.env.privateKey);
    return decoded;
  } catch (error) {
    console.log("Decoding encountered a problem error => ", error);
  }
};

export { HashPassword, GenerateToken, VerifyPassword, VerfiyToken };
