const todo = require("../models/todoModel.js");
const mongoose = require("mongoose");

//adding a todo
exports.addTodo = async (request, response) => {
  try {
    const { title, description } = request.body;
    const userId = request.body.userId;
    const newTodo = await todo.create({
      user: userId,
      title: title,
      description: description,
    });

    await newTodo.save();

    return response.status(200).json({ success: true, message: newTodo });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

// fetching all todos
exports.getAllTodos = async (request, response) => {
  try {
    const userId = request.body.userId;
    const todos = await todo.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(`${userId}`) } },
      { $sort: { createdAt: -1 } },
    ]);
    return response.status(200).json({ success: true, message: todos });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

//change the status of todo
exports.toggleTodoStatus = async (request, response) => {
  try {
    const todoItem = await todo.findById(request.params.id);

    if (!todoItem) {
      return response.status(404).json({ message: "Todo not found" });
    }

    todoItem.status = !todoItem.status;

    await todoItem.save();

    return response.status(200).json({ success: true, message: todoItem });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

//update todo
exports.updateTodo = async (request, response) => {
  try {
    const todoId = request.params.id;

    const { title, description } = request.body;

    const updatedData = {
      title,
      description,
      updatedAt: Date.now(),
    };

    const updatedTodo = await todo.findOneAndUpdate(
      { _id: todoId },
      updatedData,
      { new: true }
    );

    if (!updatedTodo) {
      return response.status(404).json({
        success: false,
        message: "Todo not found or you're not authorized to update it",
      });
    }

    return response.status(200).json({ success: true, data: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

//delete todo
exports.deleteTodo = async (request, response) => {
  try {
    const deletedTodo = await todo.findByIdAndDelete(request.params.id);

    if (!deletedTodo) {
      return response.status(404).json({ message: "Todo not found" });
    }

    return response.status(200).json({ success: true, message: deletedTodo });
  } catch (error) {
    return response
      .status(500)
      .json({ success: flase, message: error.message });
  }
};
