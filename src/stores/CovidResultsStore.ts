import { makeAutoObservable, action } from "mobx";
import { IDictionary } from "../interfaces";

class CovidResultsStore {

  results: object = {}
  data: object = {}

  constructor() {
    makeAutoObservable(this);
    this.fetchData();
  }

  @action fetchData(){
    fetch('https://covid-api.mmediagroup.fr/v1/cases')
      .then(res => res.json())
      .then(res => {
          this.results = res
          this.data = res.Global.All
      })
  }

  @action fetchAll(country: string){
    Promise.all([
      fetch(`https://covid-api.mmediagroup.fr/v1/cases?ab=${country}`),
      fetch(`https://covid-api.mmediagroup.fr/v1/history?ab=${country}&status=deaths`),
      fetch(`https://covid-api.mmediagroup.fr/v1/history?ab=${country}&status=confirmed`),
      fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?ab=${country}`)
    ]).then(async([casesResponse, deathsResponse, confirmedResponse, vaccinesResponse]) => {
      let { All: cases } = await casesResponse.json()
      let { All: deaths } = await deathsResponse.json()
      let { All: confirmed } = await confirmedResponse.json()
      let { All: vaccines } = await vaccinesResponse.json()
      this.data = {
        cases, 
        history: {deaths, confirmed}, 
        vaccines
      }
    })
  }

  @action fetchByCases(country: string){
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?ab=${country}`)
      .then(res => res.json())
      .then(res => this.data = res.All)
  }

  @action fetchByHistory(country: string){
    fetch(`https://covid-api.mmediagroup.fr/v1/history?ab=${country}`)
      .then(res => res.json())
      .then(res => this.data = res.All)
    Promise.all([
      fetch(`https://covid-api.mmediagroup.fr/v1/history?ab=${country}&status=deaths`),
      fetch(`https://covid-api.mmediagroup.fr/v1/history?ab=${country}&status=confirmed`)
    ]).then(async([deathsResponse, confirmedResponse]) => {
      let deaths = (await deathsResponse.json()).All
      let confirmed = (await confirmedResponse.json()).All
      this.data = { history: { deaths, confirmed }}
    })
  }

  @action fetchByVaccines(country: string){
    fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?ab=${country}`)
      .then(res => res.json())
      .then(res => this.data = res.All)
  }

  @action fetchByContinent(continent: string){
    if(continent === "Americas"){
      Promise.all([
        fetch(`https://covid-api.mmediagroup.fr/v1/cases?continent=North America`),
        fetch(`https://covid-api.mmediagroup.fr/v1/cases?continent=South America`)
      ]).then(([NA, SA]) => this.sortCountriesList(NA, SA))
        .then((results) => this.results = results);
    }else{
      fetch(`https://covid-api.mmediagroup.fr/v1/cases?continent=${continent}`)
        .then(res => res.json())
        .then(res => this.results = res)
    }
  }

  async sortCountriesList(NA: Response, SA: Response){
    let data: object = {...(await NA.json()), ...(await SA.json())}
    let arrayData = Object.entries(data).map(([key, value]) => {
      return {...value, country: key}
    })
    arrayData.sort((a: { country: string }, b: { country: string }) => a.country.localeCompare(b.country))
    let results: IDictionary<object> = {};
    for await(let data of arrayData){
      results[data.country] = { All: data.All }
    }
    return results
  }
  
}

const covidResultsStore = new CovidResultsStore();

export default covidResultsStore;