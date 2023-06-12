import prisma from '../utils/prisma';

const getAllTodos = async (userId: number | undefined) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return todos;
  } catch (error) {
    throw error;
  }
};

const createTodo = async (title: string, userId: number) => {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed: false,
        userId,
      },
    });

    return newTodo;
  } catch (error) {
    throw error;
  }
};

const getTodo = async (id: number) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    return todo;
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (
  id: number,
  title: string,
  completed: boolean | string,
  userId: number | undefined
) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (todo?.userId !== userId) {
      throw new Error('You are not authorized to update this todo');
    }

    if (!todo) {
      throw new Error('Todo not found');
    }

    const updateData: { title?: string; completed?: boolean } = {};

    if (title) {
      updateData.title = title;
    }

    if (completed) {
      if (typeof completed === 'boolean') {
        updateData.completed = completed;
      }

      if (typeof completed === 'string') {
        updateData.completed = completed === 'true' ? true : false;
      }
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: updateData,
    });

    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (id: number, userId: number | undefined) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (todo?.userId !== userId) {
      throw new Error('You are not authorized to delete this todo');
    }

    if (!todo) {
      throw new Error('Todo not found');
    }

    await prisma.todo.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
};

const toggleTodo = async (id: number, userId: number | undefined) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (todo?.userId !== userId) {
      throw new Error('You are not authorized to complete this todo');
    }

    if (!todo) {
      throw new Error('Todo not found');
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed: !todo.completed,
      },
    });

    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

const deleteAllTodos = async (userId: number | undefined) => {
  try {
    await prisma.todo.deleteMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    throw error;
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
