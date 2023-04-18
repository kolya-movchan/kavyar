// CHANGE TYPE OF INPUT TO EMAIL type="text" - WRONG/TEMPORARY

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { postCredentials } from '../../api/fetch';
import '../../styles/main.scss';
import { ErrorMessage } from '../ErrorMessage';
// import { User } from '../../types/User';
import { Header } from '../Header';

export type Props = {
  onLogin: (token: string) => void,
};

export const AuthForm: React.FC<Props> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  

  const htmlElement = document.getElementById("html");

  const saveAdmin = (keyData: string) => {
    // localStorage.setItem('token', JSON.stringify(token));

    onLogin(keyData);
  };

  const loadAdmin = async () => {
    const dataToPost = {login, password};
    const key = await postCredentials(dataToPost);

    console.log('KEY: ', key);

    if (key) {
      saveAdmin(key);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    hideNotification();
  
    try {
      await loadAdmin();
      setError(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (emailValue: string) => {
    setLogin(emailValue);
    hideNotification();
  };

  const handlePassword = (passwordValue: string) => {
    setPassword(passwordValue);
    hideNotification();
  };

  const hideNotification = () => {
    setError(false);
  };

  useEffect(() => {
    htmlElement?.classList.add('hidden-scroll');

    const tokenData = localStorage.getItem('token');

    if (!tokenData) {
      return;
    }

    try {
      const admin = JSON.parse(tokenData);

      onLogin(admin);

    } catch (e) {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 1000);
    }
  });

  return (
    <>
      <Header navBar={false}/>

      {error && (
        <ErrorMessage
          title='Невдалий вхід'
          description='Перевірте логін та пароль'
          type='error'
          onExit={hideNotification}
        />
      )}

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
                type="text"
                placeholder="Логін"
                value={login}
                onChange={(event) => handleEmail(event.target.value)}
              />
            </div>

            <div className="login__login-container">
              <input
                className="input login__password-input login__input"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => handlePassword(event.target.value)}
              />
            </div>

            <div className="field">
              <button
                className={classNames(
                  'button is-success login__login-button',
                  {'is-loading': loading}
                )}
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
