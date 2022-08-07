import React, { useState, useEffect} from 'react';
import { useDispatch, } from "react-redux";
import { getTemperament } from '../../Redux/Actions'
import NavBar from '../NavBar';
import  AllDogs  from '../AllDogs'
import Filter from '../Filter';

export default function HomePage() {

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperament())
  }, [dispatch])

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  return (
    <div>
      <NavBar />
      <Filter
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      />
      <AllDogs
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dogsPerPage={dogsPerPage}
        indexOfFirstDog={indexOfFirstDog}
        indexOfLastDog={indexOfLastDog}
      />
    </div>
  )
}
