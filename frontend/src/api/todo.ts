import toast from 'react-hot-toast';
import axios from '../config/axios';

export const deleteTodo = async (id: number, token: string) => {
  try {
    const result = await toast.promise(
      axios.delete(`/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: 'Deleting todo...',
        success: 'Todo deleted',
        error: 'Failed to delete todo',
      }
    );

    if (result.status === 200 || result.data.status === 'SUCCESS') {
      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export const toggleTodo = async (id: number, token: string) => {
  try {
    const res = await toast.promise(
      axios.get(`/todo/${id}/toggle`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: 'Toggling Todo',
        success: 'Todo Toggled',
        error: 'Toggling Failed',
      }
    );

    if (res.status === 200 || res.data.status === 'SUCCESS') {
      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export const editTodo = async (id: number, newTitle: string, token: string) => {
  try {
    const res = await toast.promise(
      axios.put(
        `/todo/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        loading: 'Updating Todo',
        success: 'Todo Edited',
        error: 'Failed to Update',
      }
    );

    if (res.status === 200 || res.data.status === 'SUCCESS') {
      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export const addTodo = async (todoText: string, token: string) => {
  try {
    const res = await toast.promise(
      axios.post(
        '/todo',
        { title: todoText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        loading: 'Adding Todo',
        success: 'Todo Added',
        error: 'Failed to Add',
      }
    );

    console.log(res);

    if (res.status === 201 || res.data.status === 'SUCCESS') {
      return res.data.todo;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getTodos = async (token: string) => {
  try {
    const res = await axios.get('/todo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const todos = res.data.todos;

    return todos;
  } catch (error) {
    console.log(error);
    return [];
  }
};
