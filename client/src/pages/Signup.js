import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth/AuthState';
import { AlertContext } from '../context/alert/AlertState';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // consume context
  const authContext = useContext(AuthContext);
  const { signUp, clearErrors, error } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    state: '',
    postalCode: '',
    city: '',
    address: '',
  });

  const { name, email, password, password2, state, postalCode, city, address } =
    admin;

  useEffect(() => {
    if (error && error.msg) {
      setAlert(error.msg, 'alert-danger');
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const navigateTo = useNavigate();

  const onChangeHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      state === '' ||
      postalCode === '' ||
      city === '' ||
      address === ''
    ) {
      setAlert('All fields are required!!!', 'alert-danger');
      console.log('All fields are required');
    } else if (password !== password2) {
      setAlert("Password didn't match!!!", 'alert-danger');
      console.log("Password didn't match");
    } else {
      // register user
      signUp({
        name,
        email,
        password,
        state,
        postalCode,
        city,
        address,
      });
      console.log(`IF error is ${error}`);
      if (error === null) {
        setAdmin({
          name: '',
          email: '',
          password: '',
          password2: '',
          state: '',
          postalCode: '',
          city: '',
          address: '',
        });
        navigateTo('/login');
        setAlert('Sign Up Successfull. You can login now.', 'alert-success');
        e.target.reset();
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
    >
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center">Sign up</h1>

        {/* Cinema Name  */}
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="name"
          placeholder="Cinema Name"
          onChange={onChangeHandler}
          value={name}
          required
        />
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

        {/* Password and confirm password  */}
        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangeHandler}
          required
        />
        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="password2"
          placeholder="Confirm Password"
          value={password2}
          onChange={onChangeHandler}
          required
        />

        {/* state  */}
        <select
          name="state"
          id="state"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          value={state}
          onChange={onChangeHandler}
          required
        >
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Andaman and Nicobar Islands">
            Andaman and Nicobar Islands
          </option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
          <option value="Daman and Diu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>

        {/* city  */}
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="city"
          placeholder="Enter City"
          value={city}
          onChange={onChangeHandler}
          required
        />

        {/* postal code  */}
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="postalCode"
          placeholder="Postal Code"
          value={postalCode}
          onChange={onChangeHandler}
          required
        />

        {/* address  */}
        <textarea
          name="address"
          cols="30"
          rows="5"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          value={address}
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
        Already have an account?
        <a
          className="no-underline border-b border-blue text-blue"
          href="../login/"
        >
          Log in
        </a>
      </div>
    </form>
  );
};

export default Signup;
