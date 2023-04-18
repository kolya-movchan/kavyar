import React, { useState } from 'react';
import { AuthForm } from './AuthForm';
// import jwt from 'jsonwebtoken';

export const AuthContext = React.createContext<string | null>(null);

// function decodeJwt(token: string, secretKey: string) {
//   try {
//     const decoded = jwt.verify(token, secretKey);
//     return decoded;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // if (token) {
  //   const decoded = decodeJwt(token, 'sampleKey');

  //   console.log(decoded);
  // }


  console.log(token);

  if (!token) {
    return (
      <AuthForm onLogin={setToken} />
    );
  }

  return (
    <AuthContext.Provider value={token}>
      {children}
    </AuthContext.Provider>
  );
};
