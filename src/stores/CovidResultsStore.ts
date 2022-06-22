import { makeAutoObservable, action } from "mobx"

// class CovidResultsStore {

//   results: object = {}

//   constructor() {
//     makeAutoObservable(this);
//     this.fetchData();
//   }

//   fetchData(){
//     fetch('https://covid-api.mmediagroup.fr/v1/cases')
//       .then(res => res.json())
//       .then(res => this.results = res)
//   }

// }

class CovidResultsStore {

  results: object = {}

  constructor() {
    makeAutoObservable(this);
    this.fetchData();
  }

  @action fetchData(){
    fetch('https://covid-api.mmediagroup.fr/v1/cases')
      .then(res => res.json())
      .then(res => this.results = res)
  }

  @action fetchByCountry(country: string){
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`)
      .then(res => res.json())
      .then(res => this.results = res)
  }

  @action sayHi(par: string) {
    console.log('hi ', par)
  }

}

const covidResultsStore = new CovidResultsStore();

export default covidResultsStore;