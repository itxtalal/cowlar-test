import { NextFunction, Request, Response } from 'express';
import prisma from '../utils/prisma';

// Get all todos
const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

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

    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed: false,
        userId: req.user!.id,
      },
    });

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

    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

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

    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (todo?.userId !== req.user?.id) {
      return res.status(403).json({
        message: 'You are not authorized to update this todo',
        status: 'FAILED',
      });
    }

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
        status: 'FAILED',
      });
    }

    const updateData: { title?: string; completed?: boolean } = {};

    if (title) {
      updateData.title = title;
    }

    if (completed) {
      updateData.completed = completed === 'true';
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: updateData,
    });

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

    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (todo?.userId !== req.user?.id) {
      return res.status(403).json({
        message: 'You are not authorized to delete this todo',
        status: 'FAILED',
      });
    }

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
        status: 'FAILED',
      });
    }

    await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });

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

    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (todo?.userId !== req.user?.id) {
      return res.status(403).json({
        message: 'You are not authorized to complete this todo',
        status: 'FAILED',
      });
    }

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
        status: 'FAILED',
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        completed: !todo.completed,
      },
    });

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
    await prisma.todo.deleteMany({
      where: {
        userId: req.user?.id,
      },
    });

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
