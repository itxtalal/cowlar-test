import { FC } from 'react';
import { ITodo } from '../interfaces';

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
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

const Todo: FC<Props> = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <li className="w-full border-b border-gray-200 rounded-t-lg">
      <div className="flex items-center pl-3 pr-2">
        <input
          type="checkbox"
          value={todo.completed.toString()}
          onChange={() => toggleTodo(todo.id)}
          className="w-6 h-6  text-blue-600 bg-gray-100 hover:bg-blue-600 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 transition-all cursor-pointer"
        />
        <label className="w-full py-3 ml-3 mr-2 text-base lg:text-lg font-medium text-gray-900">
          {todo.title}
        </label>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-1 text-red-500"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default Todo;
