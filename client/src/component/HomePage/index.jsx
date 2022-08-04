import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import { useDispatch, } from "react-redux";
import { getAllDogs } from '../../Redux/Actions';
import  AllDogs  from '../AllDogs'
import Filter from '../Filter';

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  return (
    <div>
      <NavBar />
      <Filter />
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
