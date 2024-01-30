import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Implementasi logika pengecekan izin di sini
    const userHasPermission = true; // Gantilah dengan logika sesuai kebutuhan

    if (!userHasPermission) {
      // Jika pengguna tidak memiliki izin, alihkan ke halaman login atau halaman lain
      navigate('/');
    }
  }, [navigate]);

  // Render komponen hanya jika pengguna memiliki izin
  return <Component {...rest} />;
};

export default ProtectedRoute;
