/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faSyringe, faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import { continentsData, covidStore, dataStore } from "../../interfaces/index";
import ContinentSelector from "./ContinentSelector";
import CountrySelector from "./CountrySelector";
import Info from "./Info";
import Map from "./Map";
import "./Info.css";
import "./Home.css";

const Home = observer(({ 
  CovidResultsStore,
} : { 
  CovidResultsStore: covidStore;
} ) => {
  const [countryStore, setCountryStore] = useState<object>({})
  const [dataStore, setDataStore] = useState<dataStore>({})
  const [isLoading, setLoading] = useState(true)
  const [country, setCountry] = useState<string>("")
  const [continent, setContinent] = useState<continentsData>({
    value: '',
    mapName: '',
    name: 'All',
    id: 0
  })

  useEffect(() => {
    if(Object.keys(CovidResultsStore.results).length > 1){
      setCountryStore(CovidResultsStore.results)
      setDataStore(CovidResultsStore.data)
    }
  }, [CovidResultsStore.results])

  useEffect(() => {
    if(Object.keys(countryStore).length > 1){
      setLoading(false)
    }
  }, [countryStore])

  useEffect(() => {
    selectedCountry(country)
  }, [country])

  useEffect(() => {
    selectedContinent(continent)
  }, [continent])

  const selectedCountry = (country: string) => {
    // console.log(country, 'crt')
  }

  const selectedContinent = (continent: continentsData) => {
    console.log(continent, 'cont')
    
    if (continent.value === "") CovidResultsStore.fetchData() 
    else CovidResultsStore.fetchByContinent(continent.value)
  }

  if(isLoading){
    return(
      <div>Cargando...</div>
    )
  }else{
    return (
      <div className="margins">
        <div className="App flexing">
          <div className="left-side">
            <div className="card">
              <ContinentSelector continent={continent} setContinent={(continent: continentsData) => setContinent(continent)}/>
              <CountrySelector CovidResultsStore={countryStore} country={country} setCountry={(country: string) => setCountry(country)} />
            </div>
            <div className="first-row">
              <div className="card first-button bg-midnigth">
                <div className="iconSkull">
                  <FontAwesomeIcon icon={faDatabase} />
                </div>
                <p>Cases</p>
              </div>
              <div className="card second-button bg-redsun">
                <div className="iconSkull">
                  <FontAwesomeIcon icon={faSyringe} />
                </div>
                <p>Vaccines</p>
              </div>
            </div>
            <div className="card third-button bg-greengrass">
              <div className="iconSkull">
                <FontAwesomeIcon icon={faNotesMedical} />
              </div>
              <p>History</p>
            </div>
          </div>
          <div className="right-side">
            <Map mapSelected={(countryName:string) => setCountry(countryName)} continent={continent}/>
          </div>
        </div>
  
        <div className="info">
          <Info dataStore={dataStore}/>
        </div>
        
      </div>
    );
  }
})

export default inject("CovidResultsStore")(Home);
