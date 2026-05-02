const jwt = require("jsonwebtoken");
const User = require("./models/user");

const JWT_SECRET = process.env.JWT_SECRET || "utn-api-secret-key";

const readBearerToken = (headers = {}) => {
  const authHeader = headers.authorization || headers.Authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return "";
  }

  return authHeader.slice("Bearer ".length).trim();
};

const buildGraphqlContext = async ({ req }) => {
  const token = readBearerToken(req?.headers);

  if (!token) {
    return { req, token: "", user: null };
  }

  try {
    // GraphQL reutiliza el mismo JWT del backend REST para mantener una sola sesion.
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    return {
      req,
      token,
      user: user || null,
    };
  } catch (_error) {
    return { req, token, user: null };
  }
};

module.exports = {
  buildGraphqlContext,
};
