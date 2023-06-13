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
    console.log('Get All Todo Service Error', error);
    throw new Error('Get All Todo Service Error');
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
    console.log('Create Todo Service Error', error);
    throw new Error('Create Todo Service Error');
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
    console.log('Get Todo Service Error', error);
    throw new Error('Get Todo Service Error');
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
    console.log('Update Todo Service Error', error);
    throw new Error('Update Todo Service Error');
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
    console.log('Delete Todo Service Error', error);
    throw new Error('Delete Todo Service Error');
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
    console.log('Toggle Todo Service Error', error);
    throw new Error('Toggle Todo Service Error');
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
    console.log('Delete All Todo Service Error', error);
    throw new Error('Delete All Todo Service Error');
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
