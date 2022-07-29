import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShowContext } from '../../context/show/ShowContext';

const ShowListItem = ({ show }) => {
  const { deleteShow, clearCurrent, setCurrent } = useContext(ShowContext);
  // console.log(show);

  const onDelete = () => {
    deleteShow(show.id);
    clearCurrent();
  };
  return (
    <li className="flex justify-between">
      <h1>{show.movieName}</h1>
      <Link
        to="/addShow"
        onClick={() => setCurrent(show)}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Update
      </Link>
      <button
        onClick={onDelete}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Delete
      </button>
    </li>
  );
};

export default ShowListItem;
