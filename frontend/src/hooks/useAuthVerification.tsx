import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../utils/api';
import { UserContext } from '../context';

const useAuthVerification = () => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('COWLAR_TOKEN');
      if (token) {
        const user = await verifyToken(token);
        if (user) {
          updateUser(user);
          navigate('/');
        }
      }
      setPageLoading(false);
    };

    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem('COWLAR_TOKEN');
    navigate('/login');
  };

  return { pageLoading, logoutHandler };
};

export default useAuthVerification;
