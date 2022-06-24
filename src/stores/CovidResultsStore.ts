import { makeAutoObservable, action } from "mobx";
import API_COPY_TO_TEST from "../API_COPY_TO_TEST.json";

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
        //FOR REMOVE
        if(Object.keys(res).length <= 1){
          this.results = API_COPY_TO_TEST
          this.data = res.Global.All
        }else{
          this.results = res
          this.data = res.Global.All
        }
      })
  }

  @action fetchByCases(country: string){
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?ab=${country}`)
      .then(res => res.json())
      .then(res => this.data = res)
  }

  @action fetchByHistory(country: string){
    fetch(`https://covid-api.mmediagroup.fr/v1/history?ab=${country}`)
      .then(res => res.json())
      .then(res => this.data = res)
  }

  @action fetchByVaccines(country: string){
    fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?ab=${country}`)
      .then(res => res.json())
      .then(res => this.data = res)
  }

  @action fetchByContinent(continent: string){
    if(continent === "Americas"){
      Promise.all([
        fetch(`https://covid-api.mmediagroup.fr/v1/cases?continent=North America`),
        fetch(`https://covid-api.mmediagroup.fr/v1/cases?continent=South America`)
      ]).then( async ([NA, SA]) => {
        let data = {...(await NA.json()), ...(await SA.json())}
        this.results = data;
      })
    }else{
      fetch(`https://covid-api.mmediagroup.fr/v1/cases?continent=${continent}`)
        .then(res => res.json())
        .then(res => this.results = res)
    }
  }

  @action sayHi(par: string) {
    console.log('hi ', par)
  }

}

const covidResultsStore = new CovidResultsStore();

export default covidResultsStore;