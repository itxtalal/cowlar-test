import express from 'express';
import {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  toggleTodo,
  deleteAllTodos,
} from '../controllers/todo';
import verifyJWT from '../utils/middlewares/verifyJWT';
import { checkSchema } from 'express-validator';
import { createTodoSchema } from '../schemas/todo';
import { validateSchema } from '../utils/middlewares/validateSchema';

const todoRouter = express.Router();

// Get all todos
// GET /api/v1/todo
todoRouter.get('/', verifyJWT, getAllTodos);

// Create a new todo
// POST /api/v1/todo
todoRouter.post(
  '/',
  checkSchema(createTodoSchema),
  validateSchema,
  verifyJWT,
  createTodo
);

// Delete all todos
// GET /api/v1/todo/delete-all
todoRouter.get('/delete-all', verifyJWT, deleteAllTodos);

// Get a specific todo
// GET /api/v1/todo/:id
todoRouter.get('/:id', verifyJWT, getTodo);

// Update a todo
// PUT /api/v1/todo/:id
todoRouter.put('/:id', verifyJWT, updateTodo);

// Delete a todo
// DELETE /api/v1/todo/:id
todoRouter.delete('/:id', verifyJWT, deleteTodo);

// Complete a todo
// GET /api/v1/todo/:id/complete
todoRouter.get('/:id/toggle', verifyJWT, toggleTodo);

export default todoRouter;
