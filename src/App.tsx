import './App.css';
import Notifications from 'react-notify-toast';
import Routing from './components/Routing';
import { Provider } from "mobx-react";
import covidResultsStore from './stores/CovidResultsStore';

function App() {
  return (
    <Provider CovidResultsStore={covidResultsStore}>
      <Notifications options={{ zIndex: 9999 }} />
      <Routing />
    </Provider>
  );
}

export default App;
