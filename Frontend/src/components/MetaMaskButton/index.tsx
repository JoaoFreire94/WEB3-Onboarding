import { Button, Center, Text } from '@chakra-ui/react';
import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useEffect, useState, useRef } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect Metamask!';
const CONNECTED_TEXT = 'Connected';

export function MetaMaskButton() {
  const { address } = useAccount();
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const onboarding = useRef<MetaMaskOnboarding>();

  const { connect } = useConnect({
    connector: new InjectedConnector()
  });

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (address) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current?.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [address]);

  const onClick = () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled() || !window.ethereum) {
      onboarding.current?.startOnboarding();
    } else if (!address) {
      connect();
    }
  };

  return (
    <Center w="full" h="90%" display="flex" flexDir="column">
      <Button disabled={isDisabled} onClick={onClick}>
        {buttonText}
      </Button>
      <Text color="white" mt="50px">
        Remember to pin up the Plugin!
      </Text>
    </Center>
  );
}
