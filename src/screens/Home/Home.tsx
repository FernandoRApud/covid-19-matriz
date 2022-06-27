/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { notify } from 'react-notify-toast';
import { inject, observer } from "mobx-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faNotesMedical, faSyringe, faCalendar } from '@fortawesome/free-solid-svg-icons'
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
  const [specificRequest, setSpecificRequest] = useState<string>("cases")
  const [countryStore, setCountryStore] = useState<object>({})
  const [dataStore, setDataStore] = useState<dataStore>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCountries, setIsLoadingCountries] = useState(true)
  const [isLoadingInfo, setIsLoadingInfo] = useState(true)
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
      setIsLoadingCountries(false)
    }
  }, [CovidResultsStore.results])

  useEffect(() => {
    setDataStore(CovidResultsStore.data)
  }, [CovidResultsStore.data])

  useEffect(() => {
    if(country !== ""){
      setIsLoadingInfo(true)
      selectedCountry(country)
      notify.show(`You're searching ${specificRequest} of ${country}, please wait`, 'success');
    }
  }, [specificRequest])

  useEffect(() => {
    if(Object.keys(countryStore).length > 1){
      setIsLoading(false)
    }
  }, [countryStore])

  useEffect(() => {
    setIsLoadingInfo(true)
    if(country !== ""){
      notify.show(`You selected ${country}, please wait`, 'success');
      selectedCountry(country)
    }
  }, [country])

  useEffect(() => {
    setIsLoadingCountries(true)
    selectedContinent(continent)
    notify.show(`You selected the continent: ${continent.name}, please wait`, 'success');
  }, [continent])

  const selectedCountry = (country: string) => {
    if(specificRequest === "all") CovidResultsStore.fetchAll(country)
    if(specificRequest === "cases") CovidResultsStore.fetchByCases(country)
    if(specificRequest === "vaccines") CovidResultsStore.fetchByVaccines(country)
    if(specificRequest === "history") CovidResultsStore.fetchByHistory(country)
  }

  const selectedContinent = (continent: continentsData) => {
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
              <CountrySelector CovidResultsStore={countryStore} country={country} setCountry={(country: string) => setCountry(country)} isLoadingCountries={isLoadingCountries}/>
            </div>
            <div className="first-row">
              <div className="card first-button bg-yellow" onClick={() => setSpecificRequest("all")}>
                <div className="icons">
                  <FontAwesomeIcon icon={faDatabase} />
                </div>
                <p>All</p>
              </div>
              <div className="card second-button bg-midnigth" onClick={() => setSpecificRequest("cases")}>
                <div className="icons">
                  <FontAwesomeIcon icon={faNotesMedical} />
                </div>
                <p>Cases</p>
              </div>
            </div>
            <div className="first-row">
              <div className="card first-button bg-redsun" onClick={() => setSpecificRequest("vaccines")}>
                <div className="icons">
                  <FontAwesomeIcon icon={faSyringe} />
                </div>
                <p>Vaccines</p>
              </div>
              <div className="card second-button bg-greengrass" onClick={() => setSpecificRequest("history")}>
                <div className="icons">
                  <FontAwesomeIcon icon={faCalendar} />
                </div>
                <p>History</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <Map mapSelected={(countryName:string) => setCountry(countryName)} continent={continent}/>
          </div>
        </div>
  
        <div className="info">
          <Info dataStore={dataStore} country={country} specificRequest={specificRequest} isLoading={isLoadingInfo} setIsLoading={setIsLoadingInfo} />
        </div>
        
      </div>
    );
  }
})

export default inject("CovidResultsStore")(Home);
