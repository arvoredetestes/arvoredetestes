import TestExecution from "../../models/TestExecution";
import { Controllers } from "../../util/types";

const projectController: Controllers = {
  async index(req, res) {
    try {
      const items = await TestExecution.find();

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
      const item = await TestExecution.findById(id);
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
      const item: any = new TestExecution(req.body);
      await item.save();
      res
        .status(200)
        .json({ status: "success", message: "TestExecution created" });
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
      const item = await TestExecution.findByIdAndUpdate(
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
  async deleteTestExecution(req, res) {
    try {
      const { id } = req.params;
      await TestExecution.findByIdAndDelete(id);

      res
        .status(200)
        .json({ status: "success", message: "TestExecution deleted" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
};

export default projectController;
