/* eslint-disable react/jsx-no-useless-fragment */
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LS from '../../utils/localStorage';

export function LogoutButton(): JSX.Element {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setToken(LS.get('userToken'));
  }, []);

  const handleClick = (): void => {
    LS.remove('userToken');
    navigate('/login');
  };
  if (token) {
    return (
      <Button onClick={handleClick} bg="grey" color="white">
        Logout
      </Button>
    );
  }
  return <></>;
}
