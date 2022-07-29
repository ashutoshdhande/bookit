import React, { useContext } from 'react';
import ShowList from '../components/ShowList/ShowList';
import { ShowContext } from '../context/show/ShowContext';

const Dashboard = () => {
  const { shows } = useContext(ShowContext);
  // console.log(shows);
  return (
    <>
      <h1 className="w-1/2 border-2 border-red-600 p-7 rounded-md">
        This is Authenticated user can see
      </h1>
      <ShowList />
    </>
  );
};

export default Dashboard;
