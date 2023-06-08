import { useState, useEffect, useContext } from 'react';
import { ITodo } from '../interfaces';
import Todo from './Todo';
import Loading from './Loading';
import { UserContext } from '../context';
import axios from '../config/axios';

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { todos, hydrateTodos } = useContext(UserContext);
  const token = localStorage.getItem('COWLAR_TOKEN');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get('/todo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const todos = res.data.todos;

      hydrateTodos(todos);
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-xl text-center md:text-2xl xl:text-3xl font-medium text-white">
        Todo List
      </h1>
      {todos.length > 0 ? (
        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
          {todos.map((todo: ITodo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
      ) : (
        <p className="text-lg text-white">No Todos</p>
      )}
    </div>
  );
};

export default TodoList;
