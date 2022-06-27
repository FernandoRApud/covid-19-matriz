export interface dataStore {
  population?: number,
  confirmed?: number,
  recovered?: number,
  deaths?: number,
  country?: string,
  sq_km_area?: number,
  life_expectancy?: string,
  elevation_in_meters?: number,
  continent?: string,
  abbreviation?: string,
  location?: string,
  iso?: number,
  capital_city?: string,
  lat?: string,
  long?: string,
  updated?: string,
  dates?: object,
  administered?: number,
  people_vaccinated?: number,
  people_partially_vaccinated?: number,
  cases?: {
    population: number,
    confirmed: number,
    recovered: number,
    deaths: number,
  }, 
  history?: {
    deaths?: {
      dates: {
        [key: string]: number
      },
      population?: number,
      confirmed?: number,
      recovered?: number,
      deaths?: number,
    },
    confirmed?: {
      dates: {
        [key: string]: number
      },
      population?: number,
      confirmed?: number,
      recovered?: number,
      deaths?: number,
    },
  }, 
  vaccines?: {
    population: number,
    administered: number,
    people_vaccinated: number,
    people_partially_vaccinated: number,
  }
}