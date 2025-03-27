import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ message: "Unauthorized: No userId found" });
    }

    req.user = decoded.userId; // Attach userId to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
