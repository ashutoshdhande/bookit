import React from 'react';
import { Link, Router } from 'react-router-dom';
// import './MenuItem.css';

const MenuItem = ({ name, icon, path }) => {
  return (
    <Link
      to={path}
      className="flex my-5 space-x-2 items-center block hover:cursor-pointer hover:text-coral transition-colors"
    >
      <div>
        {React.createElement(icon, {
          className: 'nav-icon',
        })}
      </div>
      <div className="font-semibold text-lg">{name}</div>
    </Link>
  );
};

export default MenuItem;
