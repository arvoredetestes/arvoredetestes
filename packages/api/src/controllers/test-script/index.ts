import TestScript from "../../models/TestScript";
import { Controllers } from "../../util/types";

const testScriptController: Controllers = {
  async index(req, res) {
    try {
      const query = {
        projectId: req.query.project,
        versionsIds: req.query.version,
      };
      const items = await TestScript.find(query);

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
      const item = await TestScript.findById(id);
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
      const item: any = new TestScript(req.body);
      await item.save();
      res
        .status(200)
        .json({ status: "success", message: "TestScript created" });
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
      const item = await TestScript.findByIdAndUpdate(
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
  async deleteTestScript(req, res) {
    try {
      const { id } = req.params;
      await TestScript.findByIdAndDelete(id);

      res
        .status(200)
        .json({ status: "success", message: "TestScript deleted" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
};

export default testScriptController;
