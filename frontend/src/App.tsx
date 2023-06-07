import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Protected from './Layout/Protected';
import Home from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context';
import { verifyToken } from './utils/api';
import Loading from './components/Loading';

function App() {
  const { user, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const func = async () => {
      const token = localStorage.getItem('COWLAR_TOKEN');

      if (token) {
        const user = await verifyToken(token);
        updateUser({ ...user, token });
      }
    };
    func();
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected isSignedIn={user !== null}>
              <Home />
            </Protected>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
