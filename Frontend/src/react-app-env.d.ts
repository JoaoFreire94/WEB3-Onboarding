/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="react-scripts" />
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
