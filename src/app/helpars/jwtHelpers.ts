import jwt from "jsonwebtoken";

const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    //     algorithm: "ES256",
    expiresIn: expiresIn,
  });
  return token;
};
export default generateToken;
