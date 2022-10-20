/* eslint-disable react/jsx-no-useless-fragment */
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function LoginButton(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate('/login');
  };

  return (
    <Button onClick={handleClick} mt="30px" bg="grey" color="white">
      Go to Login
    </Button>
  );
}
