import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperament } from '../../Redux/Actions'
import NavBar from '../NavBar';
import { postDog } from '../../Redux/Actions'
import styles from './CreateDogs.module.css'

function validate(value) {
  let error = {};
  let msnText = 'campo obligatorio'
  let msnNun = 'solo puede contener numeros'

  // validate name
  if(!value.name){
    error.name = `nombre ${msnText}`;
  }else if(!/[A-Z]+$/i.test(value.name)) {
    error.name = 'nombre solo puede contener letras'
  }else if(parseInt(value.name.length) >= 15){
    error.name = 'debe contener menos de 15 caracteres'
  }

  //height_max
  if(value.height_max === ""){ // "12"
    error.height_max = `altura Max ${msnText}`;
  }else if(parseInt(value.height_max) > 81){
    error.height_max = 'altura deve ser nemor a 80'
  }else if(!/^[0-9]+$/.test(value.height_max)){
    error.height_max = `altura Max ${msnNun}`
  }

  //height_min
  if(value.height_min === ""){
    error.height_min = `altura Min ${msnText}`;
  }else if(parseInt(value.height_min) >= parseInt(value.height_max) || parseInt(value.height_min) < 5){
    error.height_max = `altura deve ser mayor ${value.height_min}`
  }else if(!/^[0-9]+$/.test(value.height_min)){
    error.height_min = `altura Min ${msnNun}`
  }

  //weight_max
  if(value.weight_max === ""){
    error.weight_max = `peso Max ${msnText}`;
  }else if(parseInt(value.weight_max) > 50){
    error.weight_max = 'peso deve ser nemor a 50'
  }else if(!/^[0-9]+$/.test(value.weight_max)){
    error.weight_max = `peso Max ${msnNun}`
  }

  //weight_min
  if(value.weight_min  === ""){
    error.weight_min = `peso Min ${msnText}`;
  }else if(parseInt(value.weight_min) >= parseInt(value.weight_max) || parseInt(value.weight_min) < 1){
    error.weight_max = `peso deve ser mayor ${value.weight_min}`
  }else if(!/^[0-9]+$/.test(value.weight_min)){
    error.weight_min = `peso Min ${msnNun}`
  }

  // life_max
  if(parseInt(value.life_max) > 15){
    error.life_max = 'año deve ser menor a 15'
  }else if(!/^[0-9]+$/.test(value.life_max) && value.life_max !== ""){
    error.life_max = `años Max ${msnNun}`
  }

  // life_min
  if(parseInt(value.life_min) >= parseInt(value.life_max) || parseInt(value.life_min) < 0){
    error.life_max = `año deve ser mayor ${value.life_min}`
  }else if(!/^[0-9]+$/.test(value.life_min) && value.life_min !== "" ){
    error.life_min = `años Min ${msnNun}`
  }
  return error;
}

export default function CreateDogs() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTemperament())
  }, [])

  const temperaments = useSelector(state => state.temperaments)
  const allDogs = useSelector(state => state.allDogs)

  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_min: "",
    life_max: "",
    img: "",
    temperament: []
  });

  const randonImg = (value) => {
    const imgDogs = value.map(dog => dog.img);
    const num = (Math.floor(Math.random() * (imgDogs.length - 0 + 1) + 0))
    return imgDogs[num];
  }

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      img: randonImg(allDogs)
    });
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect(temper) {
    if(input.temperament.includes(temper.target.value)) return;
        setInput({
          ...input,
          temperament: [...input.temperament, temper.target.value]
        })
  }

  function create(value) {
    const existsDog = allDogs.find(dog => dog.name.toLowerCase() === input.name.toLowerCase())
    if(existsDog){
      return alert(`El nombre ${input.name} ya lo tiene otro peludo`)
    }
    if(!error.name && !error.height_min && !error.height_max &&!error.weight_min && !error.weight_max){
      try {
        value.preventDefault();
        dispatch(postDog(input));
      setInput({});
      } catch (error) {
        console.log(error);
      }
    }else return 'campos requeridos';
  }

  function handleSubmit(event) {
    // event.preventDefault();
    return create(event);
  }

  function handleDeleteTemper(temper) {
    setInput({
      ...input,
      temperament: input.temperament.filter(allTemper => allTemper !== temper.target.value)
    })
  }

  return (
    <div>
      <NavBar />
      <div className={styles.contentodoform}>
      <h1>ADOPTA UN PELUDO</h1>
      <h3>Describe como seria tu amigo peludo ideal para ti y tu familia.</h3>
      <h5>llena este pequeño formulario</h5>
      <h5>Datos obligatorios*</h5>
      <form className={styles.contenform}  onSubmit={handleSubmit}>
        <div className={styles.conteninputs}>
          <div className={styles.conteninput}>
        <p className={styles.title}>Nombre*</p>
        <input className={error.name? styles.errorsearchBarname : styles.searchBarname} type="text" name="name" placeholder='Eje: Chandozo' onChange={handleChange} value={input.name}/>
          </div>
        <div className={styles.conteninput}>
          <p className={styles.title}>Altura*</p>
          <div className={styles.imputext}>
            <input className={error.height_min? styles.errorsearchBar : styles.searchBar} type="text" name="height_min" placeholder='Min' onChange={handleChange} value={input.height_min}/>
            <span>Cm</span>
            <input className={error.height_max? styles.errorsearchBar : styles.searchBar} type="text" name="height_max" placeholder='Max' onChange={handleChange} value={input.height_max}/>
            <span>Cm</span>
          </div>
        </div>
        <div className={styles.conteninput}>
          <p className={styles.title}>Peso*</p>
          <div className={styles.imputext}>
            <input className={error.weight_min? styles.errorsearchBar : styles.searchBar} type="text" name="weight_min" placeholder='Min' onChange={handleChange} value={input.weight_min}/>
            <span>Kg</span>
            <input className={error.weight_max? styles.errorsearchBar : styles.searchBar} type="text" name="weight_max" placeholder='Max' onChange={handleChange} value={input.weight_max}/>
            <span>Kg</span>
          </div>
        </div>
        <div className={styles.conteninput}>
          <p className={styles.title}>Años</p>
          <div className={styles.imputext}>
            <input className={error.life_min? styles.errorsearchBar : styles.searchBar} type="text" name="life_min" placeholder='Min' onChange={handleChange} value={input.life_min}/>
            <span>Años</span>
            <input className={error.life_max? styles.errorsearchBar : styles.searchBar} type="text" name="life_max" placeholder='Max' onChange={handleChange} value={input.life_max}/>
            <span>Años</span>
          </div>
        </div>
        <div className={styles.conteninput}>
          <p className={styles.title}>Temperamento</p>
          <select className={styles.searchBar} name="temperament" onChange={handleSelect}>
            {temperaments?.map(temper =>
              <option value={temper.name} key={temper.id}>{temper.name}</option>
              )}
          </select>
        </div>
        <div>
          <ul className={styles.contelist}>
              {input.temperament?.map((temper, i) => {
                return (
                  <li className={styles.list} key={i}>
                    {temper}
                    <button className={styles.bottonx} type='button' value={temper} onClick={handleDeleteTemper}>x</button>
                  </li>
                )
              })}
          </ul>
        </div>
        <div>
          {
            (error.name || error.height_min || error.height_max || error.weight_min || error.weight_max || error.life_max || error.life_min) ? <div className={styles.error}>{error.name || error.height_min || error.height_max || error.weight_min || error.weight_max || error.life_max || error.life_min}</div>
            : <input type='submit' value='Adoptar' className={styles.imputtuton}/>
          }
        </div>
        </div>
      </form>
      </div>
    </div>
  )
}
