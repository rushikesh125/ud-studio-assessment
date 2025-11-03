'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store/store';
import Loading from '@/app/loading';

export function ReduxProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}