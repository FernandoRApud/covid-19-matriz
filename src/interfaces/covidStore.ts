export interface covidStore {
  results: object,
  data: object,
  fetchByContinent: (continent: string) => void,
  fetchAll: (country: string) => void,
  fetchByCases: (country: string) => void,
  fetchByHistory: (country: string) => void,
  fetchByVaccines: (country: string) => void,
  fetchData: () => void
}