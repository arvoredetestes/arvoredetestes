import { User as UserInterface } from "@monorepo/types";
import bcrypt from "bcryptjs";
import { map } from "lodash";

import User from "../../models/User";
import { Controllers } from "../../util/types";

function cleanUser(user): Omit<UserInterface, "token"> {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    _id: user._id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
const userController: Controllers = {
  async index(req, res) {
    try {
      const user = await User.find();
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      const data = cleanUser(user);
      res.status(200).json({ status: "success", data });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
  async list(req, res) {
    try {
      const users = await User.find();
      const data = map(users, cleanUser);
      res.status(200).json({ status: "success", data });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
  async loggedUser(req, res) {
    try {
      // @ts-ignore
      const user: any = await User.findById(req.user._id);
      const data: UserInterface = {
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: user.token,
        email: user.email,
        _id: user._id,
      };
      res.status(200).json({ status: "success", data });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const user: any = await User.create(req.body);
      await user.save();

      const data: Omit<UserInterface, "token"> = {
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        _id: user._id,
      };
      res.status(200).json({
        status: "success",
        message: "User created",
        data,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const password = await bcrypt.hash(req.body.password, 12);

      await User.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            email,
            password,
          },
        },
        { upsert: false, new: true }
      );

      res.status(200).json({ status: "success", message: "User updated" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);

      res.status(200).json({ status: "success", message: "User deleted" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },

  async deleteAll(req, res) {
    try {
      await User.deleteMany({});
      res.status(200).json({ status: "success", message: "All users deleted" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
};

export default userController;
