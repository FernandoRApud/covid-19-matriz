/* eslint-disable react-hooks/exhaustive-deps */
import React, {} from "react";
import { observer } from "mobx-react";
import { dataStore } from "../../interfaces/index";
import "./Info.css";
import "./Home.css";

const Info = observer(({ 
  dataStore,
} : { 
  dataStore: dataStore;
}) => {
  return (
    <div className="card">
      <h1>{dataStore.population}</h1>
      <h1>{dataStore.confirmed}</h1>
      <h1>{dataStore.recovered}</h1>
      <h1>{dataStore.deaths}</h1>
    </div>
  );
  
})

export default Info;
