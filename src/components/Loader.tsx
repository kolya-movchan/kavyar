import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

type Props = {
  type: LoadingType,
  color: string,
  height?: string,
  width?: string,
};

export const Loader: React.FC<Props> = ({ type, color, height = 50, width = 50 }) => (
  <ReactLoading type={type} color={color} height={height} width={width} />
);
