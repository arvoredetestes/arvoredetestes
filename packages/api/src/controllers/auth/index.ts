import { User as UserInterface } from "@monorepo/types";

import User from "../../models/User";
import { Controllers } from "../../util/types";

const authController: Controllers = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      // @ts-ignore
      const user: any = await User.findByCredentials(email, password);

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }
      if (user === "invalid-password") {
        throw new Error("INVALID_PASSWORD");
      }

      if (user) await user.generateAuthToken();
      const data: UserInterface = {
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: user.token,
        email: user.email,
        _id: user._id,
      };
      res.status(200).json({ status: "success", data: data });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },

  async logout(req, res) {
    try {
      // @ts-ignore
      req.user.tokens = req.user.tokens.filter(
        // @ts-ignore
        (token) => token.token != req.token
      );
      // @ts-ignore
      await req.user.save();

      res.status(200).json({ status: "success", message: "User disconnected" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },

  async logoutAll(req, res) {
    try {
      // @ts-ignore
      req.user.tokens.splice(0, req.user.tokens.length);
      // @ts-ignore
      await req.user.save();
      res.status(200).json({
        status: "success",
        message: "User disconnected on all devices",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
};
export default authController;
