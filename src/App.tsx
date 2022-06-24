import './App.css';
import Notifications from 'react-notify-toast';
import Routing from './components/Routing';
import NavigationBar from './components/NavigationBar';
import { Provider } from "mobx-react";
import covidResultsStore from './stores/CovidResultsStore';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider CovidResultsStore={covidResultsStore}>
      <Notifications options={{ zIndex: 9999 }} />
      <BrowserRouter>
        <NavigationBar/>
        <Routing CovidResultsStore={covidResultsStore}/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
