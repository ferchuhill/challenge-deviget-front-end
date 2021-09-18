/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/layout';
import { Provider } from 'react-redux';
import store from '../redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
