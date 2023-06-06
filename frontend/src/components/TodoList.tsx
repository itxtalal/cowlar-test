import { useState, useEffect } from 'react';
import { ITodo } from '../interfaces';
import Todo from './Todo';
import Loading from './Loading';

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const todos = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos') || '[]')
      : [];
    setTodos(todos);
    setIsLoading(false);
  }, []);

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo: ITodo) => todo.id !== id);
    setTodos(() => newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-xl text-center md:text-2xl xl:text-3xl font-medium text-white">
        Todo List
      </h1>
      {todos.length > 0 ? (
        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
          {todos.map((todo: ITodo) => (
            <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} />
          ))}
        </ul>
      ) : (
        <p className="text-lg text-white">No Todos</p>
      )}
    </div>
  );
};

export default TodoList;
