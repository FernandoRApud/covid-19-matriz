import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PUBLIC_ROUTES } from './constants';
import Home from '../../screens/Home/Home';

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {PUBLIC_ROUTES.map((route) => {
          return(
          <Route
            key={route.id}
            path={route.path}
            element={<Home />}
            // element={Home}
            // element={route.component}
          />
        )
        })}
      </Routes>
    </BrowserRouter>
  );
}
