'use client';
import { Provider } from 'react-redux';
import { store } from '../index';
export const ReduxProvider = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};
