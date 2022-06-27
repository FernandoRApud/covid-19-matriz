import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PUBLIC_ROUTES } from './constants';
import { covidStore } from "../../interfaces/index";

export default function Routing({ 
  CovidResultsStore,
} : { 
  CovidResultsStore: covidStore;
}) {
  return (
    <Routes>
      {PUBLIC_ROUTES.map((route) => {
        return(
        <Route
          key={route.id}
          path={route.path}
          element={<route.component CovidResultsStore={CovidResultsStore}/>}
        />
      )
      })}
    </Routes>
  );
}
