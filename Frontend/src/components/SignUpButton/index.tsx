/* eslint-disable react/jsx-no-useless-fragment */
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function SignInButton(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate('/signup');
  };

  return (
    <Button onClick={handleClick} m="50px" bg="grey" color="white">
      Sign Up
    </Button>
  );
}
