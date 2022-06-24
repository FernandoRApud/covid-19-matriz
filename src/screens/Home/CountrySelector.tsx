/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import { useForm, Controller } from "react-hook-form";
import "./Info.css";
import "./Selectors.css";

const CountrySelector = observer(({ 
  CovidResultsStore,
  country,
  setCountry
} : { 
  CovidResultsStore: object;
  country: string;
  setCountry: (c: string) => void;
} ) => {

  const { control } = useForm();

  return (
    <form>
      <Controller
        control={control}
        name="countrySelector"
        defaultValue=""
        rules={{
          validate: {
            beginSpace: (value) => /^\S/.test(value)
          }
        }}
        render={() => {
          // console.log(alo)
          return(
          <select onChange={(e) => {
            // console.log(e)
            setCountry(e.target.value)
          }}
            value={country}
            className="countrySelector"
          > 
          <option hidden value="">Select a country...</option>
          {
            Object.entries(CovidResultsStore).map(([countryName, countryData]) => 
              {
                return(
                <option value={countryData.All.abbreviation} key={countryData.All.abbreviation}>
                  {countryName}
                </option>
                )
              }
            )
          }
          </select>
        )}}
      />
    </form>
  );
})

export default CountrySelector;
