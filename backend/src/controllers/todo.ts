import { NextFunction, Request, Response } from 'express';
import prisma from '../utils/prisma';
import * as todoService from '../services/todo';

// Get all todos
const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const todos = await todoService.getAllTodos(userId);

    res.status(200).json({
      todos,
      message: 'Todos retrieved successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    next('Error retrieving todos');
  }
};

// Create a new todo
const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const userId = req.user!.id;

    const newTodo = await todoService.createTodo(title, userId);

    res.status(201).json({
      status: 'SUCCESS',
      message: 'Todo created successfully',
      todo: newTodo,
    });
  } catch (error) {
    console.log(error);
    next('Error creating todo');
  }
};

// Get a specific todo
const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const todo = await todoService.getTodo(parseInt(id));

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
        status: 'FAILED',
      });
    }

    res.status(200).json({
      todo,
      message: 'Todo retrieved successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    next('Error retrieving todo');
  }
};

// Update a todo
const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await todoService.updateTodo(
      parseInt(id),
      title,
      completed,
      req.user?.id
    );

    res.status(200).json({
      status: 'SUCCESS',
      message: 'Todo updated successfully',
      todo: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    next('Error updating todo');
  }
};

// Delete a todo
const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await todoService.deleteTodo(parseInt(id), req.user?.id);

    res.status(200).json({
      status: 'SUCCESS',
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.log(error);
    next('Error deleting todo');
  }
};

// toggle a todo completion status
const toggleTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const updatedTodo = await todoService.toggleTodo(
      parseInt(id),
      req.user?.id
    );

    res.status(200).json({
      status: 'SUCCESS',
      message: 'Todo completed successfully',
      todo: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    next('Error completing todo');
  }
};

// Delete all todos
const deleteAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await todoService.deleteAllTodos(req.user?.id);

    res.status(200).json({
      status: 'SUCCESS',
      message: 'Todos deleted successfully',
    });
  } catch (error) {
    console.log(error);
    next('Error deleting todos');
  }
};

export {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  deleteAllTodos,
};
