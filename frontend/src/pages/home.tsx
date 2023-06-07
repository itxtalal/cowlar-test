import { useNavigate } from 'react-router-dom';
import RootLayout from '../Layout';
import TodoAdd from '../components/TodoAdd';
import TodoList from '../components/TodoList';

const HomePage = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('COWLAR_TOKEN');
    navigate('/login');
  };

  return (
    <RootLayout>
      <div className="min-h-screen overflow-auto flex flex-col items-center py-8">
        <button
          className={`text-white my-2 font-medium rounded text-sm md:text-base lg:text-lg px-5 py-2.5 text-center inline-flex items-center transition-all bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ml-auto mr-10`}
          onClick={logoutHandler}
        >
          Log Out
        </button>
        <div className="w-[90%] lg:w-[60%] xl:w-[60%] flex flex-col gap-6">
          <TodoAdd />
          <TodoList />
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;
