import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth/AuthState';
import { AlertContext } from '../context/alert/AlertState';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // consume context
  const authContext = useContext(AuthContext);
  const { login, clearErrors, error, isAuthenticated } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  const { email, password } = admin;

  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      setAlert(error, 'alert-danger');
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isAuthenticated) {
    navigateTo('/');
  }

  const onChangeHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    login({ email, password });
    console.log(`Login Page error ${error}`);
  };

  return (
    <form
      method="POST"
      onSubmit={onSubmitHandler}
      className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
    >
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center">Login</h1>
        {/* Email  */}
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
          onChange={onChangeHandler}
          value={email}
          required
        />

        {/* Password   */}
        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangeHandler}
          required
        />

        <button
          className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80"
          id="login"
          type="submit"
        >
          <span>Signup</span>
        </button>
      </div>
      <div className="text-grey-dark mt-6">
        Don't have an account?
        <a
          className="no-underline border-b border-blue text-blue"
          href="../signup/"
        >
          Sign Up
        </a>
      </div>
    </form>
  );
};

export default Login;
