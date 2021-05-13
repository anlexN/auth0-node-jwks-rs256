import { createRemoteJWKSet } from "jose/jwks/remote";
import { jwtVerify } from "jose/jwt/verify";

export default (options) => {
  const { algorithms, audience, issuer, jwksUri, subject, typ } = options;
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const parts = authHeader.split(" ");

      if (parts.length != 2) {
        throw new Error("No authorization token was found");
      }

      const scheme = parts[0];
      if (!/^Bearer$/i.test(scheme)) {
        throw new Error("Format is not Authorization: Bearer [token]");
      }

      const accessToken = parts[1];

      const JWKS = createRemoteJWKSet(new URL(jwksUri));

      const { payload } = await jwtVerify(accessToken, JWKS, {
        algorithms,
        audience,
        issuer,
        subject,
        typ,
      });
      req.user = payload;
      next();
    } catch (error) {
      next(error);
    }
  };
};
