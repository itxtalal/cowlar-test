import RootLayout from './Layout';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';

function App() {
  return (
    <RootLayout>
      <div className="min-h-screen overflow-auto flex flex-col items-center justify-center py-8">
        <div className="w-[90%] lg:w-[60%] xl:w-[60%] flex flex-col gap-6">
          <TodoAdd />
          <TodoList />
        </div>
      </div>
    </RootLayout>
  );
}

export default App;
