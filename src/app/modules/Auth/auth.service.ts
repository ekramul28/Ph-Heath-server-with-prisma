import prisma from "../shared/prisma";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import generateToken from "../../helpars/jwtHelpers";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  console.log(isCorrectPassword);
  console.log(userData);

  if (!isCorrectPassword) {
    throw new Error("password incorrect");
  }

  const accessToken = generateToken(
    { email: userData.email, role: userData.role },
    "abcdefg",
    "5m"
  );
  const refreshToken = generateToken(
    { email: userData.email, role: userData.role },
    "abcdefgklaman",
    "30d"
  );
  console.log(accessToken);

  return {
    accessToken,
    refreshToken,
    needPasswordChange: true,
  };
};

const refreshToken = async (token: string) => {
  let decodeData;
  try {
    decodeData = jwt.verify(token, "abcdefgklaman");
    console.log(decodeData);
  } catch (error) {
    throw new Error("You are Not authorize");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodeData?.email,
    },
  });

  const accessToken = generateToken(
    { email: userData?.email, role: userData?.role },
    "abcdefg",
    "5m"
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: true,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
