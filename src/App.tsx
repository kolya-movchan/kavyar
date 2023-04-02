import React from 'react';

import './styles/main.scss';
import { Header } from './components/Header';
import { Form } from './components/Add CFP/Form/Form';

export const App: React.FC = () => {
  return (
    <>
      <Header></Header>
      <Form></Form>
    </>
  );
};
