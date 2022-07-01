import { UserRole } from "@monorepo/types";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { Middleware } from "../util/types";

const admin: Middleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token && process.env.JWT_SECRET) {
      const data = jwt.verify(token as string, process.env.JWT_SECRET);

      // @ts-ignore
      const user: typeof User = await User.findOne({ _id: data._id, token });

      if (!user) throw new Error();
      // @ts-ignore
      if (user.role !== UserRole.admin) throw new Error();
      // @ts-ignore
      req.user = user;
      // @ts-ignore
      req.token = token;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(403).send({
      error: "Not authorized to access this resource",
    });
  }
};
export default admin;
