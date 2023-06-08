import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import Button from './Button';
import Input from './Input';
import { UserContext } from '../context';
import axios from '../config/axios';

const TodoAdd = () => {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTodo } = useContext(UserContext);

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

    const token = localStorage.getItem('COWLAR_TOKEN');

    try {
      const res = await axios.post(
        '/todo',
        { title: todo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);

      if (res.status === 201 || res.data.status === 'SUCCESS') {
        addTodo && addTodo(res.data.todo);
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
