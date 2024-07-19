const express = require("express");
const {
  addTodo,
  deleteTodo,
  getAllTodos,
  toggleTodoStatus,
  updateTodo,
} = require("../controllers/todoController.js");
const authMiddleware = require("../middleware/auth.js");
const todoRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the todo
 *         user:
 *           type: string
 *           description: The ID of the user who created the todo
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         status:
 *           type: boolean
 *           description: The status of the todo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the todo was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the todo was last updated
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/todo/add:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Some server error
 */
todoRouter.post("/add", authMiddleware, addTodo);

/**
 * @swagger
 * /api/todo/get:
 *   get:
 *     summary: Returns the list of all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
todoRouter.get("/get", authMiddleware, getAllTodos);

/**
 * @swagger
 * /api/todo/status/{id}:
 *   put:
 *     summary: Toggle the status of the todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 */
todoRouter.put("/status/:id", authMiddleware, toggleTodoStatus);

/**
 * @swagger
 * /api/todo/update/{id}:
 *   put:
 *     summary: Update the todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 */
todoRouter.put("/update/:id", authMiddleware, updateTodo);

/**
 * @swagger
 * /api/todo/delete/{id}:
 *   delete:
 *     summary: Remove the todo by id
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo was deleted
 *       404:
 *         description: The todo was not found
 */
todoRouter.delete("/delete/:id", authMiddleware, deleteTodo);

module.exports = todoRouter;
