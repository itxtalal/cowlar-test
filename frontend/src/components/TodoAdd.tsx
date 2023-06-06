import { useState } from 'react';
import Button from './Button';
import Input from './Input';

const TodoAdd = () => {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    setError('');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!todo) {
      setError('Please add a todo');
      setIsLoading(false);
      return;
    }
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(
        'todos',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('todos') || '[]'),
          { title: todo, id: Date.now() },
        ])
      );
      setTodo('');
    }, 2000);
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
        placeholder="Learn Docker"
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
