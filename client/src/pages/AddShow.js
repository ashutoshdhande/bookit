import React, { useContext } from 'react';
import ShowForm from '../components/ShowForm/ShowForm';
import { ShowContext } from '../context/show/ShowContext';

const AddShow = () => {
  const { current } = useContext(ShowContext);
  return (
    <section>
      <h1 className="text-center font-medium text-3xl">
        {current ? 'Update' : 'Add'} Show
      </h1>
      <ShowForm />
    </section>
  );
};

export default AddShow;
