import React from "react"
import { useDispatch } from "react-redux"
import { filterCreate } from '../../Redux/Actions'


export default function Filter({currentPage, setCurrentPage}) {

  const dispatch = useDispatch();

  function handleSelect(input){
    // console.log("input:", input.target.value);
    setCurrentPage(1)
    dispatch(filterCreate(input.target.value))
  }

  return (
    <div>
      <span>Filtros:</span>
      <select name='filter' onChange={handleSelect}>
        <option disabled>selecciona uno</option>
        <option value="Todos">Todos</option>
        <option value="Creados">Mis Peludos</option>
      </select>
    </div>
  )

}
