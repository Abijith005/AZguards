import { Request, Response } from "express";
import todoModel from "../models/todoModel";
import jwtDecode from "../helpers/jwtDecode";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import {
  todoInputValidation,
  validateStatus,
} from "../helpers/inputValidation";
import mongoose from "mongoose";
import { StatusEnum } from "../dtos/todo.dto";

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { description, status } = req.body;
    let validator = todoInputValidation({ description, status });
    if (!validator.valid) {
      return res
        .status(400)
        .json({ success: false, message: validator.message });
    }

    const token: string = req.headers.authorization?.split(" ")[1]!;
    const decode = jwtDecode(token);
    if (!decode) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { id } = decode;
    await todoModel.create({ description, status, userId: id });
    return res.status(200).json({
      success: true,
      message: "Todo item added successfully",
    });
  } catch (error: any) {
    console.log(`error/n ${error}`);
    const message = error.errors.status.message || "Internal server error";
    res.status(500).json({ success: false, message: message });
  }
};

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1]!;
    const decode = jwtDecode(token);
    if (!decode) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { id } = decode;
    const todos = await todoModel.find({ userId: id }).lean();

    return res.status(200).json({ success: true, todos: todos });
  } catch (error: any) {
    console.log(`error/n ${error}`);
    const message = error.errors.status.message || "Internal server error";
    res.status(500).json({ success: false, message: message });
  }
};

export const getOneTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid id parameter" });
    }
    const todo = await todoModel.findOne({ _id: id });
    res.status(200).json({ success: true, todo: todo });
  } catch (error: any) {
    console.log(`error/n ${error}`);
    const message = error.errors.status.message || "Internal server error";
    res.status(500).json({ success: false, message: message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid id parameter" });
    }
    const { description, status } = req.body;
    let validator = todoInputValidation({ description, status });
    if (!validator.valid) {
      return res
        .status(400)
        .json({ success: false, message: validator.message });
    }
    const updateObject: any = {};
    if (description) {
      updateObject.description = description;
    }
    if (status) {
      updateObject.status = status;
    }
    const result = await todoModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateObject },
      { runValidators: true }
    );
    if (!result) {
      return res.status(404).json({ success: true, message: "Todo not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Todo updated successfully" });
  } catch (error: any) {
    console.log(`error/n ${error}`);
    const message = error.errors.status.message || "Internal server error";
    res.status(500).json({ success: false, message: message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid id parameter" });
    }
    const result = await todoModel.findByIdAndDelete({ _id: id });
    if (!result) {
      return res.status(404).json({ success: true, message: "Todo not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error: any) {
    console.log(`error/n ${error}`);
    const message = error.errors.status.message || "Internal server error";
    res.status(500).json({ success: false, message: message });
  }
};

export const uploadTodoItems = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const token: string = req.headers.authorization?.split(" ")[1]!;
    const { id } = jwtDecode(token);
    const filePath = req.file.path;
    const todoItems: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row) {
          const { description, status } = row;
          todoItems.push({ description, status, userId: id });
        }
      })
      .on("end", async () => {
        await todoModel.insertMany(todoItems);
        fs.unlinkSync(filePath);
        res
          .status(200)
          .json({ success: true, message: "Todo items uploaded successfully" });
      });
  } catch (error: any) {
    console.log(`error/n ${error}`);
    const message = error.errors.status.message || "Internal server error";
    res.status(500).json({ success: false, message: message });
  }
};

export const downloadTodoList = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]!;
    const decode = jwtDecode(token);
    if (!decode) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { id } = decode;
    const todos = await todoModel
      .find({}, { _id: 0, description: 1, status: 1 })
      .lean();

    let csvData = `Description,Status\n`;
    todos.forEach((item) => {
      csvData += `"${item.description}","${item.status}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=todo_list.csv");

    const tempFilePath = path.join(
      __dirname,
      `../public/downloads/${id}todo_list.csv`
    );
    fs.writeFileSync(tempFilePath, csvData);

    res.status(200).sendFile(tempFilePath, (error) => {
      if (error) {
        console.error("Error sending CSV file:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        fs.unlinkSync(tempFilePath);
      }
    });
  } catch (error: any) {
    console.log(`error/n ${error}`);
    const message = error.errors.status.message || "Internal server error";
    res.status(500).json({ success: false, message: message });
  }
};

export const filterTodos = async (req: Request, res: Response) => {
  try {
    const { status } = req.query ;
    const validator = validateStatus(status as string);
    const todos = await todoModel.find({ status: status }).lean();
    res.status(200).json({ success: true, todos: todos });
  } catch (error: any) {
    console.log(`error/n ${error}`);
    const message = error.errors.status.message || "Internal server error";
    res.status(500).json({ success: false, message: message });
  }
};
