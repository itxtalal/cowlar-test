import RootLayout from '../Layout';
import TodoAdd from '../components/TodoAdd';
import TodoList from '../components/TodoList';
import Loading from '../components/Loading';
import useAuthVerification from '../hooks/useAuthVerification';

const HomePage = () => {
  const { pageLoading, logoutHandler } = useAuthVerification();

  console.count('Home.tsx');

  if (pageLoading) {
    return (
      <RootLayout>
        <div className="w-screen h-screen flex items-center justify-center">
          <Loading />
          <p className="mx-2">Loading ...</p>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="min-h-screen overflow-auto flex flex-col items-center py-8">
        <button
          className="text-white my-2 font-medium rounded text-sm md:text-base lg:text-lg px-5 py-2.5 text-center inline-flex items-center transition-all bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 mx-auto lg:ml-auto lg:mr-10"
          onClick={logoutHandler}
        >
          Log Out
        </button>
        <div className="w-[90%] lg:w-[60%] xl:w-[60%] my-4 flex flex-col gap-6">
          <TodoAdd />
          <TodoList />
        </div>
      </div>
    </RootLayout>
  );
};

export default HomePage;
