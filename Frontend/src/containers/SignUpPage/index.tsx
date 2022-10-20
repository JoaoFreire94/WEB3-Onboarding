import { useMutation } from '@apollo/client';
import { Button, Center, FormLabel, Heading, Input, Spinner, useToast } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSigner } from 'wagmi';

import { isMetaMaskInstalled } from '../../App';
import { MetaMaskButton } from '../../components/MetaMaskButton';
import { CREATE_USER } from '../../graphql/mutations/createUser';
import LS from '../../utils/localStorage';

function SignUpPage(): JSX.Element {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { data: signer } = useSigner();
  const toast = useToast();

  const [createUser, { loading }] = useMutation(CREATE_USER);
  const submitUser = (name: string, email: string) => {
    if (!signer) {
      return;
    }
    signer
      .signMessage(`${email}`)
      .then((res: string) => {
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
      })
      .catch((error) => {
        toast({
          title: 'Something Went Wrong',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      });
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <Center w="full" h="90%" display="flex" flexDir="column">
      <Heading variant="headerStyle" color="white" size="4xl" p="80px" pb="120px">
        Welcome to the Future!
      </Heading>
      {isMetaMaskInstalled && isConnected ? (
        <Center>
          <Formik
            initialValues={{
              email: '',
              name: ''
            }}
            onSubmit={(values) => {
              submitUser(values.name, values.email);
            }}>
            {() => (
              <Form>
                <FormLabel color="white" htmlFor="name">
                  Name
                </FormLabel>
                <Field as={Input} type="name" name="name" bg="black" color="white" />
                <ErrorMessage name="name" component="div" />
                <FormLabel color="white" htmlFor="email">
                  Email
                </FormLabel>
                <Field as={Input} type="email" name="email" bg="black" color="white" />
                <ErrorMessage name="email" component="div" />
                <Button type="submit" colorScheme="red" width="full" mt="45px">
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Center>
      ) : (
        <MetaMaskButton />
      )}
    </Center>
  );
}

export default SignUpPage;
