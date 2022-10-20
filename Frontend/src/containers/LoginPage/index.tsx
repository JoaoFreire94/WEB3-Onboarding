/* eslint-disable prettier/prettier */
import { useLazyQuery, } from '@apollo/client';
import { Center, Button, FormLabel, Input, Heading, Spinner, useToast, Text, } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik, } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSigner } from 'wagmi';
import * as yup from 'yup';

import { isMetaMaskInstalled } from '../../App';
import { MetaMaskButton } from '../../components/MetaMaskButton';
import { SignInButton } from '../../components/SignUpButton';
import { LOGIN } from '../../graphql/querys/login';
import LS from '../../utils/localStorage';




function LoginPage() {
  const { data: signer } = useSigner();
  const [getUser, { loading, error }] = useLazyQuery(LOGIN);
  const { isConnected } = useAccount();
  const toast = useToast();

  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .defined('This Field must be defined!')
      .required('This Field is required!')
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Something Went Wrong',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }, [error])

  const loginHandler = (
    email: string,
  ) => {
    if (!signer) {
      return
    }
    signer.signMessage(`${email}`).then((res: string) => {
      getUser({ variables: { ethSignature: res } }).then((userRes) => {
        if (userRes.data) {
          LS.set('userToken', userRes.data.login);
          navigate('/');
        }
      })
    })
  };

  if (loading) {
    return <Spinner />
  }
  return (
    <Center w="full" h="90%" display="flex" flexDir="column">
      <Heading variant="headerStyle" color="white" size="4xl" p="80px" >
        Get yourself in!
      </Heading>
      {isMetaMaskInstalled && isConnected ? <Center display="flex" flexDir="column">
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            loginHandler(values.email);
          }}>
          {({ isSubmitting, isValid, dirty }) => (
            <Form style={{ width: '300px' }}>
              <FormLabel htmlFor="email" color="white">Email</FormLabel>
              <Field as={Input} type="email" name="email" bg="black" color="white" />
              <ErrorMessage name="email">{(msg) => <Text color="white">{msg}</Text>}</ErrorMessage>
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
        <Text color="white" mt="30px">No account no problem, Sign Up!</Text>
        <SignInButton />
      </Center> :
        <MetaMaskButton />
      }

    </Center>
  );
}

export default LoginPage;
