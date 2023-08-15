import jwt from "jsonwebtoken";

export const verifyToken = (...role) => {
  return (req, res, next) => {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) res.status(401).json({ msg: "Do Not Have Permission" });

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      console.log(err);
      if (err) return res.sendStatus(403);

      // if (!role.includes("admin"))
      //   return res.status(401).json({ msg: "your Role Have No Permission" });
      next();
    });
  };
};
