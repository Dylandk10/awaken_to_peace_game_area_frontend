import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ResponsiveAppBar from './components/ResponsiveNavBar';
import Home from './components/Home';
import BreathingHome from './components/BreathingHome';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/breathing-app' element={<BreathingHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
