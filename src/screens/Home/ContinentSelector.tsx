/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import { useForm, Controller } from "react-hook-form";
import { CONTINENTS } from "../../constants/continents";
import { continentsData } from "../../interfaces/index";
import "./Info.css";
import "./Selectors.css";

const ContinentSelector = observer(({
  continent,
  setContinent,
} : { 
  continent: continentsData;
  setContinent: (c: continentsData) => void;
} ) => {

  const { control } = useForm();

  return (
    <form>
      <Controller
        control={control}
        name="continentSelector"
        defaultValue=""
        rules={{
          validate: {
            beginSpace: (value) => /^\S/.test(value)
          }
        }}
        render={() => (
          <>
            <label>Continent:</label>
            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              let a: number = parseInt(e.currentTarget.value)
              setContinent(CONTINENTS[a])
            }}
              value={continent.id}
              className="continentSelector"
            >
            {
              CONTINENTS.map((continent) => 
                {
                  return(
                  <option value={continent.id} key={continent.id}>
                    {continent.name}
                  </option>
                  )
                }
              )
            }
            </select>
          </>
        )}
      />
    </form>
  );
})

export default ContinentSelector;
