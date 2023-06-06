import React, { createContext, useEffect, useState } from 'react';
import { ITodo, IUser, IUserContext } from '../interfaces';

const UserContext = createContext<IUserContext>(null!);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const updateUser = (userData: IUser) => {
    setUser(() => userData);
  };

  const addTodo = (todo: ITodo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const hydrateTodos = (todos: ITodo[]) => {
    setTodos(() => todos);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const contextValue = {
    user,
    todos,
    updateUser,
    addTodo,
    deleteTodo,
    hydrateTodos,
    toggleTodo,
  };

  // Provide the context value to the children components
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
