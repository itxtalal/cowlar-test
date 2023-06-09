import { IUser, ITodo } from '.';

export interface IUserContext {
  user: IUser | null;
  todos: ITodo[];
  updateUser: (userData: IUser) => void;
  addTodo: (todo: ITodo) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  hydrateTodos: (todos: ITodo[]) => void;
  editTodo: (id: number, text: string) => void;
}
