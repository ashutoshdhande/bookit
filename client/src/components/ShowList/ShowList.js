import React, { useContext } from 'react';
import { ShowContext } from '../../context/show/ShowContext';
import ShowListItem from './ShowListItem';

const ShowList = () => {
  const { shows, deleteShow } = useContext(ShowContext);

  return (
    <ul>
      {shows.map((show) => (
        <ShowListItem show={show} />
      ))}
    </ul>
  );
};

export default ShowList;
