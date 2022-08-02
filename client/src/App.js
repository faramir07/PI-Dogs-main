import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './component/LandingPage';
import HomePage from './component/HomePage';
import CreateDogs from './component/CreateDogs';
import DetailDog from './component/DetailDog';

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={LandingPage}/>
      <Route exact path={"/homePage"} component={HomePage}/>
      <Route exact path={"/adoptaDog"} component={CreateDogs}/>
      <Route exact path={"/detail/:id"} component={DetailDog}/>
    </div>
  );
}

export default App;
