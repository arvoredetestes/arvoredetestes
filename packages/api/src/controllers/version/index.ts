import Version from "../../models/Version";
import { Controllers } from "../../util/types";

const versionController: Controllers = {
  async index(req, res) {
    try {
      const items = await Version.find();

      res.status(200).json({
        status: "success",
        data: items,
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
    const { id } = req.params;
    try {
      const item = await Version.findById(id);
      res.status(200).json({ status: "success", data: item });
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
      const item: any = new Version(req.body);
      await item.save();
      res.status(200).json({ status: "success", message: "Version created" });
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
      const item = await Version.findByIdAndUpdate(
        id,
        { $set: { ...req.body, _id: undefined } },
        { upsert: true, new: true }
      );

      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
  async deleteVersion(req, res) {
    try {
      const { id } = req.params;
      await Version.findByIdAndDelete(id);

      res.status(200).json({ status: "success", message: "Version deleted" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
};

export default versionController;
