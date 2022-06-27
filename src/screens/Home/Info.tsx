/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { dataStore } from "../../interfaces/index";
import Error from "../../components/Error";
import InfoCases from "./Infos/InfoCases";
import InfoHistory from "./Infos/InfoHistory";
import InfoVaccines from "./Infos/InfoVaccines";
import 'react-calendar-heatmap/dist/styles.css';
import "./Info.css";
import "./Home.css";

const Info = observer(({ 
  dataStore,
  country,
  specificRequest,
  isLoading,
  setIsLoading,
} : { 
  dataStore: dataStore;
  country: string;
  specificRequest: string;
  isLoading: boolean,
  setIsLoading: (b: boolean) => void,
}) => {
  
  const [year, setYear] = useState<string>(`${new Date().getFullYear()}`)

  useEffect(() => {
    setIsLoading(false)
  }, [dataStore])

  const dateCalculation = (dates: { [key: string]: number }, year: string) => {
    let array = Object.entries(dates)
    let filteredArray = array.filter(([a]) => a.split("-")[0] === year)
    let startDate = filteredArray[filteredArray.length - 1][0]
    let finalDate = filteredArray[0][0]
    let values = filteredArray.map(([a, b]) => {
      if(a.split("-")[0] === year) return ({ date: a, count: b })
    })
    return({startDate, finalDate, values})
  }

  if(isLoading){
    return(
      <div>Cargando...</div>
    )
  }else{
    if(country === ""){
      return (
        <div className="card">
          <h1>Global data:</h1>
          <p>Total population: {dataStore.population}</p>
          <p>Population with covid confirmed: {dataStore.confirmed}</p>
          <p>Population recovered of covid: {dataStore.recovered}</p>
          <p>Population death of covid: {dataStore.deaths}</p>
        </div>
      )
    }else{
      if(specificRequest === "cases"){
        let cases100 = 0
        if(dataStore && dataStore.confirmed){
          return(<InfoCases country={country} dataStore={dataStore} cases100={cases100}/>)
        } 
        return(<Error />)
      }
      if(specificRequest === "history"){
        if(dataStore.history){
          if(dataStore.history.deaths && dataStore.history.confirmed){
            let heatmapDeathCount = dateCalculation(dataStore.history.deaths.dates, year)
            let heatmapConfirmedCount = dateCalculation(dataStore.history.confirmed.dates, year)
            return(
              <InfoHistory 
                country={country} 
                heatmapDeathCount={heatmapDeathCount} 
                heatmapConfirmedCount={heatmapConfirmedCount} 
                year={year} 
                setYear={(year: string) => setYear(year)}
              />
            )
          }
        }
      }
      if(specificRequest === "vaccines"){
        let percentage = 0
        if(dataStore.people_vaccinated && dataStore.population) {
          return(<InfoVaccines country={country} dataStore={dataStore} percentage={percentage}/>)
        }
      }
      if(specificRequest === "all"){
        var cases100 = 0
        var percentage = 0
        if(dataStore.history && dataStore.history.deaths && dataStore.history.confirmed) {
          let heatmapDeathCount = dateCalculation(dataStore.history.deaths.dates, year)
          let heatmapConfirmedCount = dateCalculation(dataStore.history.confirmed.dates, year)
          return(
            <>
              <InfoCases country={country} dataStore={dataStore.cases!} cases100={cases100}/>
              <InfoHistory 
                country={country} 
                heatmapDeathCount={heatmapDeathCount} 
                heatmapConfirmedCount={heatmapConfirmedCount} 
                extraClass={"spaceUp"}
                year={year} 
                setYear={(year: string) => setYear(year)}
              />
              <InfoVaccines country={country} dataStore={dataStore.vaccines!} percentage={percentage} extraClass={"spaceUp"}/>
            </>
          )
        }

      }
      return(<Error />)
    }
  }
  
})

export default Info;
