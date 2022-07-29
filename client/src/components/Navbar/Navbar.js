import React from 'react';
import MenuItem from './MenuItem';
import {
  MdSpaceDashboard,
  MdUpdate,
  MdHistory,
  MdLogout,
} from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';
import { IoMdAddCircleOutline } from 'react-icons/io';

const Navbar = () => {
  return (
    <nav className="flex flex-col space-y-10 items-center fixed top-0 left-0 h-screen bg-secondaryWhite min-w-fit px-5">
      {/* Brand Name and Logo  */}
      <div className="mt-2">
        <h1 className="font-bold text-4xl text-center text-coral">
          Book<span className="text-scooter">IT</span>
        </h1>
      </div>
      {/* Main Menu  */}
      <div className="mt-11">
        <MenuItem name={'Dashboard'} icon={MdSpaceDashboard} path={'/'} />
        <MenuItem
          name={'Add Show'}
          icon={IoMdAddCircleOutline}
          path={'/addShow'}
        />
        <MenuItem name={'Update Show'} icon={MdUpdate} path={'/updateShow'} />
        <MenuItem name={'History'} icon={MdHistory} path={'/history'} />
        <MenuItem
          name={'Analytics'}
          icon={SiSimpleanalytics}
          path={'/analytics'}
        />
      </div>
      {/* Theme Toggler and Logout button  */}
      <div className="w-full">
        <MenuItem name={'Log Out'} icon={MdLogout} path={'/logout'} />
      </div>
    </nav>
  );
};

export default Navbar;
