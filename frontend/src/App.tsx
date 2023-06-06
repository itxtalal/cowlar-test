import RootLayout from './Layout';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';

function App() {
  return (
    <RootLayout>
      <div className="h-screen flex flex-col items-center justify-center">
        <TodoAdd />
        <TodoList />
      </div>
    </RootLayout>
  );
}

export default App;
