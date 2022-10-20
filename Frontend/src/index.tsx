import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import App from './App';
import reportWebVitals from './reportWebVitals';

const { provider, webSocketProvider } = configureChains([chain.mainnet], [publicProvider()]);

const client = new ApolloClient({
  uri: 'http://localhost:8001/graphql',
  cache: new InMemoryCache()
});

const clientWagmi = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <WagmiConfig client={clientWagmi}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </WagmiConfig>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
