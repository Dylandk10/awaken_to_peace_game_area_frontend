import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ResponsiveAppBar from './components/ResponsiveNavBar';
import Home from './components/Home';
import BreathingHome from './components/BreathingHome';
import QuoteGameHome from './components/QuoteGameHome';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/breathing-app' element={<BreathingHome />} />
          <Route path='quote-game' element={<QuoteGameHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
