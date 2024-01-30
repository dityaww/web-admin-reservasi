import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from './components/Content';
import DetailPendakian from './pages/DetailPendakian';
import Gunung from './pages/Gunung';
import Home from './pages/Home';
import Login from './pages/Login';
import NoRoutes from './pages/NoRoutes';
import Pendakian from './pages/Pendakian';
import Profile from './pages/Profile';
import Regulation from './pages/Regulation';

const App = () => {
  
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-row">
        <Routes>
          <Route path='/'>
            <Route index element={<Login />}/>
          </Route>
          
          <Route path='/dashboard' element={<Content/>}>
            <Route index element={<Home />}/>
            <Route path='profile' element={<Profile />}/>
            <Route path='regulation' element={<Regulation />}/>
            
            <Route path='pendakian'>
              <Route index element={<Pendakian />}/> 
              <Route path=':id' element={<DetailPendakian />} />
            </Route>
            
            <Route path='mount' element={<Gunung />}/>

            <Route path='*' element={<NoRoutes />}/>
          </Route>
            
          <Route path='*' element={<NoRoutes />}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
