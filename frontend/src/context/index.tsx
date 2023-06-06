import React, { createContext, useState } from 'react';
import { ITodo, IUser, IUserContext } from '../interfaces';

const UserContext = createContext<IUserContext | null>(null);

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

  const hydrateTodos = (todos: ITodo[]) => {
    setTodos(() => todos);
  };

  const contextValue = {
    user,
    todos,
    updateUser,
    addTodo,
    deleteTodo,
    hydrateTodos,
  };

  // Provide the context value to the children components
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
