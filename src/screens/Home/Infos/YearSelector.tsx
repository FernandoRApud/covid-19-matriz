/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { START_YEAR } from "../../../constants/general";
import "../Selectors.css";

const YearSelector = ({ 
  year,
  setYear,
} : { 
  year: string;
  setYear: (c: string) => void;
} ) => {

  const { control } = useForm();

  const [options, setOptions] = useState<string[]>([])

  const differenceYears = () => {
    let difference = new Date().getFullYear() - START_YEAR;
    let options = []
    for (var i = 0; i <= difference; i++) {
      options.push(`${START_YEAR + i}`)
    }
    setOptions(options)
  }

  useEffect(() => {
    differenceYears()
  }, [])

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
        render={() => (
          <>
            <label>Year:</label>
            <select onChange={(e) => setYear(e.target.value)}
              value={year}
            > 
            {
              options.map((yearOpt) => (
                <option value={yearOpt}>
                  {yearOpt}
                </option>
              ))
            }
            {/* <option hidden value="">Select a country...</option>
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
            } */}
            </select>
          </>
        )}
      />
    </form>
  );
}

export default YearSelector;
