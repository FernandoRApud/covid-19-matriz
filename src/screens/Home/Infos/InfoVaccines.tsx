import { dataStore } from "../../../interfaces/index";
import React from 'react';
import "../Info.css";
import "../Home.css";

const InfoVaccines = ({
  country,
  dataStore,
  percentage,
  extraClass
} : {
  country: string;
  dataStore: dataStore;
  percentage: number;
  extraClass?: string
}) => {

  if(dataStore.people_vaccinated && dataStore.population) percentage = parseFloat(((dataStore.people_vaccinated / dataStore.population) * 100).toFixed(2))
  
  return (
    <div className={`card ${extraClass}`}>
      <h1>{country} - Vaccines</h1>
      <p>Total population: {dataStore.population}</p>
      <p>Vaccines administered: {dataStore.administered}</p>
      <p>Population with vaccine: {dataStore.people_vaccinated}</p>
      <p>Population with partial vaccine: {dataStore.people_partially_vaccinated}</p>
      <p>Percentage of population vaccinated: {percentage}%</p>
    </div>
  );
}

export default InfoVaccines;