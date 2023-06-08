import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../utils/api';

const useAuthVerification = () => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('COWLAR_TOKEN');
      if (token) {
        const user = await verifyToken(token);
        if (user) {
          navigate('/');
        }
      }
      setPageLoading(false);
    };

    verifyUser();
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('COWLAR_TOKEN');
    navigate('/login');
  };

  return { pageLoading, logoutHandler };
};

export default useAuthVerification;
