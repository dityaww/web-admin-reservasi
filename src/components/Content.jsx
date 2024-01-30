import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';

const Content = () => {
  const [ token, setToken ] = useState(localStorage.getItem('token'))

  return (
    <section className="content-left flex-1 h-screen overflow-y-auto">

      <div className="flex flex-row space-x-6">
        {token !== null ? <Outlet /> : <Navigate to="/" />}
      </div>

    </section>
  );
};

export default Content;
