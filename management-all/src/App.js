import logo from './logo.svg';
import './App.css';
import MapDashboard from './components/MainComponent/MapDashboard';

// Import PrimeReact CSS
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {
  return (
    <div className="App">
      <MapDashboard></MapDashboard>
    </div>
  );
}

export default App;
