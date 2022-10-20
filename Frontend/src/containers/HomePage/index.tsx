import { useLazyQuery } from '@apollo/client';
import { Button, Center, Spinner, Heading, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoutButton } from '../../components/LogoutButton';
import { ME } from '../../graphql/querys/me';
import LS from '../../utils/localStorage';

function HomePage(): JSX.Element {
  const token = LS.get('userToken');
  const navigate = useNavigate();
  const toast = useToast();
  const clickHandler = (): void => {
    navigate('/login');
  };

  const [getMe, { loading, data }] = useLazyQuery(ME);

  useEffect(() => {
    if (token) {
      getMe({ variables: { token } })
        .then((userRes) => {
          console.log(userRes);
        })
        .catch((error) =>
          toast({
            title: 'Something Went Wrong',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true
          })
        );
    }
  }, [token]);

  if (loading) {
    return <Spinner />;
  }
  if (data) {
    return (
      <Center w="full" h="full" display="flex" flexDir="column">
        <Heading variant="headerStyle" color="white" size="2xl" p="80px">
          Welcome to the web 3 {data.me}, you are awesome!!
        </Heading>
        <LogoutButton />
      </Center>
    );
  }

  return (
    <Center w="full" h="full" display="flex" flexDir="column">
      <Heading variant="headerStyle" color="white" size="xl" p="80px" pb="30">
        You are not Loged in click here
      </Heading>
      <Button onClick={clickHandler} bg="red.500" color="white">
        Go To Login
      </Button>
    </Center>
  );
}

export default HomePage;
