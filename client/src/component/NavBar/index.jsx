import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import styles from './NavBar.module.css'
import { searchDog } from '../../Redux/Actions'
import landingDog from '../../images/landingdog.png';


export default function NavBar() {
  const dispatch = useDispatch()

  const [dogName, setDogName] = useState('')

  const dogNameSearch = useSelector(state => state.dogNameSearch)

  function handleChange(e){
    setDogName(e.target.value)
    if(dogName) {
      dispatch(searchDog(dogName))
    }
  }

  function handleClick() {
    setDogName('')
  }

  return (
    <div className={styles.conteNav}>
      <Link to='/homePage'  >{<img className={styles.img} src={landingDog} alt="App Dogs" />}</Link>
      <Link to='/adoptaDog' className={styles.adopta}>Adopta un Peludo</Link>
      <div>
      <div className={styles.divInput_SearchBar}>
        <input className={styles.searchBar} type="text" placeholder="Buscar" onChange={handleChange} value={dogName}/>
        <button className={dogName.length > 0 ? styles.cleaner_active : styles.cleaner } onClick={handleClick} >x</button>
      </div>
      <div className={dogName.length !== 0 ? styles.divSearchBar_Results_active : styles.divSearchBar_Results}>
        <div >
          {dogName && dogNameSearch.slice(0, 10).map((dog, i) => {
            return (
              <div key={dog.id}>
                <Link className={styles.linkdog} to={`/detail/${dog.id}`} >{dog.name}</Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </div>
  )
}
