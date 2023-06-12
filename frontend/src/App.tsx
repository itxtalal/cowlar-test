import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
