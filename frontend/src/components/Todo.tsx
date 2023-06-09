import { FC, useContext, useState } from 'react';
import { ITodo } from '../interfaces';
import axios from '../config/axios';
import { UserContext } from '../context';

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
      clipRule="evenodd"
    />
  </svg>
);

type Props = {
  todo: ITodo;
};

const Todo: FC<Props> = ({ todo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteTodo, toggleTodo, editTodo } = useContext(UserContext);
  const [newTitle, setNewTitle] = useState(todo.title);

  const token = localStorage.getItem('COWLAR_TOKEN');

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.data.status === 'SUCCESS') {
        deleteTodo && deleteTodo(todo.id);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleToggle = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/todo/${id}/toggle`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.data.status === 'SUCCESS') {
        toggleTodo && toggleTodo(id);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behaviour
    e.preventDefault();
    console.log('submit', newTitle);
    setIsLoading(true);
    try {
      const res = await axios.put(
        `/todo/${todo.id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.data.status === 'SUCCESS') {
        editTodo && editTodo(todo.id, newTitle);
        // lose focus
        e.currentTarget.blur();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <li
      className={`w-full border-b border-gray-200 rounded-t-lg ${
        isLoading ? 'animate-pulse opacity-50' : ''
      } `}
    >
      <form onSubmit={submitHandler} className={`flex items-center pl-3 pr-2 `}>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => handleToggle(todo.id)}
          className={`flex items-center justify-center text-white rounded-full transition-all px-2 h-8 w-8 focus:ring-blue-500 focus:ring-2 ${
            todo.completed ? 'bg-blue-600' : 'bg-gray-300 hover:bg-blue-600'
          }`}
        >
          {todo.completed ? <CheckIcon /> : null}
        </button>

        <input
          className="w-full py-3 px-3 mx-2 text-base lg:text-lg font-medium text-gray-900"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setNewTitle(todo.title);
              e.currentTarget.blur();
            }
          }}
          onBlur={() => {
            setNewTitle(todo.title);
          }}
          disabled={isLoading}
        />

        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleDelete(todo.id)}
          className="p-2 text-red-500"
        >
          <DeleteIcon />
        </button>
      </form>
    </li>
  );
};

export default Todo;
