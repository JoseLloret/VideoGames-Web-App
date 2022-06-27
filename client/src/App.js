import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import GameCreate from './components/GameCreate';
import GameDetail from './components/GameDetail';



function App() {
  // el switch envuelve a las rutas y va de ruta en ruta
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path= '/' element = {<LandingPage/>}/>
        <Route path= '/home' element = {<Home/>}/>
        <Route path= '/videogame' element = {<GameCreate/>}/>
        <Route path= '/home/:id' element = {<GameDetail/>}/>
      </Routes>        
    </div>
    </Router>    
  );
}

export default App;