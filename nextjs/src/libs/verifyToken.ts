import { jwtVerify, JWTPayload } from "jose";

const verifyToken = async (token: string, publicKey: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(publicKey)
    );
    return true;
  } catch (error) {
    return false;
  }
};

export default verifyToken;
