import { Image } from '@chakra-ui/react';
import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { Images } from './assets';
import ErrorPage from './containers/ErrorPage';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';

export const isMetaMaskInstalled = MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum;
function App() {
  return (
    <BrowserRouter>
      <Image src={Images.backgroundImage} w="full" h="full" pos="fixed" zIndex={-1} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
