import { dataStore } from "../../../interfaces/index";
import React from 'react';
import "../Info.css";
import "../Home.css";

const InfoCases = ({
  country,
  dataStore,
  cases100,
} : {
  country: string;
  dataStore: dataStore,
  cases100: number
}) => {
  return (
    <div className="card">
      <h1>{country} - Cases</h1>
      <p>Total population: {dataStore.population}</p>
      <p>Population with covid confirmed: {dataStore.confirmed}</p>
      <p>Cases for every 100k of population: {cases100}</p>
      <p>Population recovered of covid: {dataStore.recovered}</p>
      <p>Population death of covid: {dataStore.deaths}</p>
    </div>
  );
}

export default InfoCases;