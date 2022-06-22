/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { inject, observer } from "mobx-react";

const Home = observer(({ CovidResultsStore }: any ) => {

  // useEffect(() => {
  //   CovidResultsStore.CovidResultsStore.fetchData()
  //   console.log('results?')
  // }, [CovidResultsStore])

  const call = (a:string) => {
    CovidResultsStore.sayHi(a)
    CovidResultsStore.fetchByCountry(a)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {
          Object.keys(CovidResultsStore.results).map(country => 
            <div>
              <a onClick={() => call(country)}>
                {country}
              </a>
            </div>
          )
        }
      </header>
    </div>
  );
})

export default inject("CovidResultsStore")(Home);
