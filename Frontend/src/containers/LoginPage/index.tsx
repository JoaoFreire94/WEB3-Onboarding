/* eslint-disable prettier/prettier */
import { useLazyQuery, } from '@apollo/client';
import { Center, Button, FormLabel, Input, Heading, Spinner, useToast, } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik, } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSigner } from 'wagmi';

import { isMetaMaskInstalled } from '../../App';
import { MetaMaskButton } from '../../components/MetaMaskButton';
import { SignInButton } from '../../components/SignUpButton';
import { LOGIN } from '../../graphql/querys/login';
import LS from '../../utils/localStorage';




function LoginPage() {
  const { data: signer } = useSigner();
  const [getUser, { loading }] = useLazyQuery(LOGIN);
  const { isConnected } = useAccount();
  const toast = useToast();

  const navigate = useNavigate();

  const loginHandler = (
    email: string,
  ) => {
    if (!signer) {
      return
    }
    signer.signMessage(`${email}`).then((res: string) => {
      getUser({ variables: { ethSignature: res } }).then((userRes) => {
        LS.set('userToken', userRes.data.login);
        navigate('/');
      })
    }).catch((error) => {

      toast({
        title: 'Something Went Wrong',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });

    })
  };

  if (loading) {
    return <Spinner />
  }
  return (
    <Center w="full" h="90%" display="flex" flexDir="column">
      <Heading variant="headerStyle" color="white" size="4xl" p="80px" >
        Get it yourself in!
      </Heading>
      {isMetaMaskInstalled && isConnected ? <Center><Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values) => {
          loginHandler(values.email);
        }}>
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <FormLabel htmlFor="email" color="white">Email</FormLabel>
            <Field as={Input} type="email" name="email" bg="black" color="white" />
            <ErrorMessage name="email" component="div" />
            <Button
              type="submit"
              colorScheme="red"
              width="full"
              disabled={!(isValid && dirty && !isSubmitting)}
              mt="10px">
              Login
            </Button>
          </Form>
        )}
      </Formik>
        <SignInButton />
      </Center> :
        <MetaMaskButton />
      }

    </Center>
  );
}

export default LoginPage;
