/* eslint-disable no-console */
import React from 'react';

import './styles/main.scss';
import { Header } from './components/Header';
import { Form } from './components/Add CFP/Form/Form';
// import { Errors } from './types/Errors';

export const App: React.FC = () => {
  // const hide = true;

  return (
    <>
      <Header />
      <Form></Form>
    </>
  );
};
