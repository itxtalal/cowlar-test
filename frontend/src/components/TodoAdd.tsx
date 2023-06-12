import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import Button from './Button';
import Input from './Input';
import { UserContext } from '../context';
import { addTodo as addTodoAPI } from '../api/todo';

const TodoAdd = () => {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTodo } = useContext(UserContext);

  const token = localStorage.getItem('COWLAR_TOKEN') || '';

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    setError('');
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!todo) {
      setError('Please add a todo');
      setIsLoading(false);
      return;
    }

    if (todo.length < 3) {
      setError('Todo must be at least 3 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const newTodo = await addTodoAPI(todo, token);

      if (newTodo) {
        addTodo && addTodo(newTodo);
      }
    } catch (error) {
      console.log(error);
    }

    setError('');
    setIsLoading(false);
    setTodo('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center gap-2"
    >
      <Input
        todo={todo}
        error={error}
        isLoading={isLoading}
        changeHandler={changeHandler}
        title="Add a Todo"
        errorPlaceholder="Please Enter a Todo"
        placeholder="Do something..."
        id="addTodo"
        type="text"
      />

      <Button
        disabled={todo === ''}
        isLoading={isLoading}
        text="Add"
        loadingText="Adding..."
      />
    </form>
  );
};

export default TodoAdd;
