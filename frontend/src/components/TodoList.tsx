import { useState, useEffect, useContext } from 'react';
import { ITodo } from '../interfaces';
import Todo from './Todo';
import Loading from './Loading';
import { UserContext } from '../context';
import axios from '../config/axios';

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { todos, hydrateTodos } = useContext(UserContext);
  const [filter, setFilter] = useState<'all' | 'complete' | 'incomplete'>(
    'all'
  );
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('filter changed');
    const filteredTodos = todos.filter((todo: ITodo) => {
      if (filter === 'all') return true;
      if (filter === 'complete') return todo.completed;
      if (filter === 'incomplete') return !todo.completed;
    });

    setFilteredTodos(() => filteredTodos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, filter]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="mb-2 text-xl text-center md:text-2xl xl:text-3xl font-medium text-white">
          Todo List
        </h2>
        <div className="flex items-center justify-center">
          <label
            htmlFor="todos"
            className="block text-sm lg:text-lg font-medium text-white w-full mr-2"
          >
            Filter Todos
          </label>
          <select
            id="todos"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full px-2 py-2"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as 'all' | 'complete' | 'incomplete')
            }
          >
            <option className="" value="" disabled>
              Select an option
            </option>
            <option value="all">All</option>
            <option value="complete">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      {filteredTodos.length > 0 ? (
        <ul className="w-full mt-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
          {filteredTodos.map((todo: ITodo) => (
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
