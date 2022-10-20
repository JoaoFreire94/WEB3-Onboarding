import { useMutation } from '@apollo/client';
import {
  Button,
  Center,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSigner } from 'wagmi';
import * as yup from 'yup';

import { isMetaMaskInstalled } from '../../App';
import { LoginButton } from '../../components/LoginButton';
import { MetaMaskButton } from '../../components/MetaMaskButton';
import { CREATE_USER } from '../../graphql/mutations/createUser';
import LS from '../../utils/localStorage';

function SignUpPage(): JSX.Element {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { data: signer } = useSigner();
  const toast = useToast();

  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  useEffect(() => {
    if (error) {
      toast({
        title: 'Something Went Wrong',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }, [error]);

  const signUpSchema = yup.object().shape({
    name: yup.string().defined('This Field must be defined!').required('This Field is required!'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .defined('This Field must be defined!')
      .required('This Field is required!')
  });

  const submitUser = (name: string, email: string) => {
    if (!signer) {
      return;
    }
    signer.signMessage(`${email}`).then((res: string) => {
      createUser({
        variables: {
          name,
          email,
          ethSignature: res
        }
      }).then((resT) => {
        LS.set('userToken', resT.data.createUser);
        navigate('/');
      });
    });
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <Center w="full" h="full%" display="flex" flexDir="column">
      <Heading variant="headerStyle" color="white" size="4xl" p="80px" pb="120px">
        Welcome to the Future!
      </Heading>
      {isMetaMaskInstalled && isConnected ? (
        <Center display="flex" flexDir="column">
          <Formik
            initialValues={{
              email: '',
              name: ''
            }}
            validationSchema={signUpSchema}
            onSubmit={(values) => {
              submitUser(values.name, values.email);
            }}>
            {({ isSubmitting, isValid, dirty }) => (
              <Form style={{ width: '300px' }}>
                <FormLabel color="white" htmlFor="name">
                  Name
                </FormLabel>
                <Field as={Input} type="name" name="name" bg="black" color="white" />
                <ErrorMessage name="name">{(msg) => <Text color="white">{msg}</Text>}</ErrorMessage>
                <FormLabel color="white" htmlFor="email">
                  Email
                </FormLabel>
                <Field as={Input} type="email" name="email" bg="black" color="white" />
                <ErrorMessage name="email">
                  {(msg) => <Text color="white">{msg}</Text>}
                </ErrorMessage>

                <Button
                  type="submit"
                  colorScheme="red"
                  width="full"
                  mt="45px"
                  disabled={!(isValid && dirty && !isSubmitting)}>
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
          <LoginButton />
        </Center>
      ) : (
        <MetaMaskButton />
      )}
    </Center>
  );
}

export default SignUpPage;
