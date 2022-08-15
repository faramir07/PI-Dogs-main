import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, } from "react-redux";
import { Route } from "react-router-dom";
import {  getAllDogs } from './Redux/Actions'
import LandingPage from './component/LandingPage';
import HomePage from './component/HomePage';
import CreateDogs from './component/CreateDogs';
import DetailDog from './component/DetailDog';

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDogs())
    }, [])

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
