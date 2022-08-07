import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterCreate, filterDog } from '../../Redux/Actions'


export default function Filter({currentPage, setCurrentPage}) {

  const dispatch = useDispatch();

  const temperaments = useSelector(state => state.temperaments)

  function handleFilter(input){
    setCurrentPage(1)
    dispatch(filterCreate(input.target.value))
  }

  function handleSelect(input){
    setCurrentPage(1)
    dispatch(filterDog(input.target.value))
  }

  return (
    <div>
      <span>Filtros:</span>
      <select name='filterdog' onChange={handleFilter}>
        <option selected disabled>selecciona uno</option>
        <option value="Todos">Todos</option>
        <option value="Creados">Mis Peludos</option>
        <option value="defauld">Por Defecto</option>
      </select>
      <select name='filtertemper' onChange={handleSelect}>
      <option selected disabled>selecciona uno</option>
      <option  value="all">Todos</option>
      {temperaments?.map(temper =>
              <option value={temper.name} key={temper.id}>{temper.name}</option>
              )}
      </select>
    </div>
  )

}
