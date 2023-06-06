import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Protected from './Layout/Protected';
import Home from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { useContext } from 'react';
import { UserContext } from './context';

function App() {
  const { user } = useContext(UserContext);
  console.log(user);
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
