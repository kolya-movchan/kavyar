import React, { useState } from 'react';
import { decodeToken } from '../../Transform';
import { AuthForm } from './AuthForm';

export const AuthContext = React.createContext<string | null>(null);

type Props = {
  children: React.ReactNode;
};

const htmlElement = document.getElementById("html");

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [guest, setGuest] = useState(false);

  if (guest) {
    htmlElement?.classList.remove('hidden-scroll');

    return (
      <AuthContext.Provider value={null}>
        {children}
      </AuthContext.Provider>
    );
  }

  if (token) {
    const decodedData = decodeToken(token);

    if (!decodedData) {
      return (
        <AuthForm
          onLogin={() => setToken(localStorage.getItem('token'))}
          onGuestMode={() => setGuest(true)}
        />
      );
    }
  }

  if (!token) {
    return (
      <AuthForm
        onLogin={() => setToken(localStorage.getItem('token'))}
        onGuestMode={() => setGuest(true)}
      />
    );
  }

  htmlElement?.classList.remove('hidden-scroll');


  return (
    <AuthContext.Provider value={token}>
      {children}
    </AuthContext.Provider>
  );
};
