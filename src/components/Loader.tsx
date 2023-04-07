import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

type Props = {
  type: LoadingType,
  color: string,
};

export const Loader: React.FC<Props> = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={50} width={50} />
);
