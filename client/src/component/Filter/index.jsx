import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterCreate, filterDog, orderAlphabet, OrderWeight } from '../../Redux/Actions'
import styles from './Filter.module.css'

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

  function handleOrder(input) {
    let value = input.target.value;
    if(value === "A-Z" || value === "Z-A"){
      dispatch(orderAlphabet(value))
    }
    if(value === "0-9" || value === "9-0"){
      dispatch(OrderWeight(value))
    }
  }

  return (
    <div>
      <div className={styles.contefilter}>
      <span>Filtros:</span>
      <select defaultValue={'DEFAULT'} className={styles.select} name='filterdog' onChange={handleFilter}>
        <option selectedValue="DEFAULT" disabled>selecciona uno</option>
        <option value="Todos">Todos</option>
        <option value="Creados">Mis Peludos</option>
        <option value="defauld">Por Defecto</option>
      </select>
      <select defaultValue={'DEFAULT'} className={styles.select} name='filtertemper' onChange={handleSelect}>
        <option selectedValue="DEFAULT" disabled>selecciona uno</option>
        <option  value="all">Todos</option>
        {temperaments?.map(temper =>
        <option value={temper.name} key={temper.id}>{temper.name}</option>
        )}
      </select>
      </div>
      <div>
        <span>Odenar por:</span>
        <select defaultValue={'DEFAULT'} className={styles.select} name="ornder" onChange={handleOrder}>
        <option selectedValue="DEFAULT" disabled>Orden</option>
          <option value="A-Z">Nombre: A-Z</option>
          <option value="Z-A">Nombre: Z-A</option>
          <option value="0-9">Peso: 0-9</option>
          <option value="9-0">Peso: 9-0</option>
        </select>
      </div>
    </div>
  )

}
