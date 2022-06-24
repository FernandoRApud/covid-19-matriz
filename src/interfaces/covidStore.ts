export interface covidStore {
  results: object,
  data: object,
  fetchByContinent: (continent: string) => void,
  fetchData: () => void
}