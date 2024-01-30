import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../assets/search.svg'
import Avatar from '../assets/avatar.png'

const Navbar = () => {
  return (
    <div className="flex flex-row gap-10">
        {/* <p>lohaa</p> */}
        <div className='flex w-full'>
            <div className="border border-gray-300 w-full flex gap-3 px-3 items-center rounded-lg">
                <img src={Search} alt="no-img"/>
                <input type={"text"} className="flex-1 outline-none" placeholder="type to search" />
            </div>
        </div>
        <div className="w-16">
            <div className="flex flex-row items-center gap-1">
                <p className='font-semibold text-lg'>Admin</p>
                <img src={Avatar} alt="" />
            </div>
        </div>
    </div>
  );
};

export default Navbar;
