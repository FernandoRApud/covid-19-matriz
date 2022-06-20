import './App.css';
import Notifications from 'react-notify-toast';
import Routing from './components/Routing';

function App() {
  return (
    <>
      <Notifications options={{ zIndex: 9999 }} />
      <Routing />
    </>
  );
}

export default App;
