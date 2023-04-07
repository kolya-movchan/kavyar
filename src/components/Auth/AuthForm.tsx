import React, { useEffect, useState } from 'react';
import { getAdminByEmail } from '../../api/fetch';
import '../../styles/main.scss';
// import { User } from '../../types/User';
import { Header } from '../Header';

export type Props = {
  onLogin: (user: string) => void,
};

export const AuthForm: React.FC<Props> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  // const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(false);
  // console.log(onLogin);

  const saveAdmin = (user: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  const loadAdmin = async () => {
    const admin = await getAdminByEmail(login);

    if (admin) {
      saveAdmin(admin);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // setErrorMessage('');
    // setLoading(true);
  
    try {
      await loadAdmin();
    } catch (error) {
      // setErrorMessage('Something went wrong');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    try {
      const admin = JSON.parse(userData) as string;

      onLogin(admin);

    } catch (error) {
      // setErrorMessage('Failed to log in, Please, try again');
    }
  });

  return (
    <>
      <Header navBar={false}/>

      <form
        className="login"
        onSubmit={handleSubmit}
      >
        <div className="login__container">
          <div className="login__credentials">
            <h1 className="login__title">
              Вхід до
              <br />
              кабінету адміністратора
            </h1>

            <div className="login__login-container">
              <input
                className="input login__login-input login__input"
                type="email"
                placeholder="Логін"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
              />
            </div>

            <div className="login__login-container">
              <input
                className="input login__password-input login__input"
                type="password"
                placeholder="Пароль"
                // value={password}
                // onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="field">
              <button
                className="buttons-local login__login-button"
                type="submit"
              >
                Увійти
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
