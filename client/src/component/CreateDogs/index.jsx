import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar';
import { getTemperament, postDog } from '../../Redux/Actions'

export default function CreateDogs() {

  function validate(value) {
    let error = {};
    let msnText = 'campo obligatorio'
    let msnNun = 'solo puede contener numeros'

    // validate name
    if(!value.name){
      error.name = msnText;
    }else if(!/[A-Z]+$/i.test(value.name)) {
      error.name = 'solo puede contener letras'
    }else if(parseInt(value.name.length) >= 15){
      error.name = 'debe contener menos de 15 caracteres'
    }

    //height_max
    if(!value.height_max){
      error.height_max = msnText;
    }else if(parseInt(value.height_max) < 80){
        error.height_max = 'deve ser nemor a 80Cm'
    }else if(!/^[0-9]+$/.test(value.height_max)){
      error.height_max = msnNun
    }

    //height_min
    if(!value.height_min){
      error.height_min = msnText;
    }else if(parseInt(value.height_min) > parseInt(value.height_max) && parseInt(value.height_min) < 5){
        error.height_min = `deve ser menor a ${value.weight_max} y mayor a 5Cm`
    }else if(!/^[0-9]+$/.test(value.height_min)){
      error.height_min = msnNun
    }

    //weight_max
    if(!value.weight_max){
      error.weight_max = msnText;
    }else if(parseInt(value.weight_max) < 50){
        error.weight_max = 'deve ser nemor a 50Kg'
    }else if(!/^[0-9]+$/.test(value.weight_max)){
      error.weight_max = msnNun
    }

    //weight_min
    if(!value.weight_min){
      errors.weight_min = msnText;
    }else if(parseInt(value.weight_min) > parseInt(value.weight_max) && parseInt(value.weight_min) < 1){
        error.weight_min = `deve ser menor a ${value.weight_max} y mayor a 1Kg`
    }else if(!/^[0-9]+$/.test(value.weight_min)){
      error.weight_min = msnNun
    }

    // life_max
    if(!value.life_max){
      error.life_max = msnText;
    }else if(parseInt(value.life_max) < 15){
      error.life_max = 'deve ser menora  15Año'
    }else if(!/^[0-9]+$/.test(value.life_max)){
      error.life_max = msnNun
    }

    // life_min
    if(!value.life_min){
      error.life_min = msnText;
    }else if(parseInt(value.life_min) > parseInt(value.life_max) && parseInt(value.life_min) < 1){
      error.life_min = `deve ser menor a ${value.life_max} y mayor a 1año`
    }else if(!/^[0-9]+$/.test(value.life_min)){
      error.life_min = msnNun
    }
    return error;
  }

  const dispatch = useDispatch()

  const temperaments = useSelector(state => state.temperaments)

  useEffect(() => {
    dispatch(getTemperament())
  }, [dispatch])

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_min: "",
    life_max: "",
    temperament: []
  });

  function handleSelect(temper) {
    if(input.temperament.includes(temper.target.value)) return;
        setInput({
          ...input,
          temperament: [...input.temperament, temper.target.value]
        })
  }

  function handleDeleteTemper(temper) {
    setInput({
      ...input,
      temperament: input.temperament.filter(allTemper => allTemper !== temper.target.value)
    })
  }

  function handleChange(value){
    setInput({
      ...input,
      [value.target.name]: value.target.value
    });
    setErrors(validate({
      ...errors,
      [value.target.name]: value.target.value
    }))
  }

  const allDogs = useSelector(state => state.allDogs);

  function handleSubmit(value) {
    value.preventDefault();
    const existsDog = allDogs.find(dog => dog.name.toLoweCase() === input.name.toLocaleLowerCase())
    if( existsDog) return alert(`El nombre ${input.name} ya lo tiene otro peludo`);
    if(!errors.name && !errors.height_min && !errors.height_max &&!errors.weight_min && !errors.weight_max){
      dispatch(postDog(input));
      setInput({});
    }
  }

  return (
    <div>
      <NavBar />
      <h1>ADOPTA UN PELUDO</h1>
      <h3>Descríbenos como seria tu amigo peludo ideal para ti y tu familia: llena este pequeño formulario</h3>
      <p>Datos obligatorios*</p>
      <form  onSubmit={handleSubmit}>
        <p>Nombre que le pondrias*</p>
        <input type="text" name="name" placeholder='Eje: Chandozo' onChange={handleChange} value={input.name}/>
        <div>
          <p>Altura*</p>
          <input type="text" name="height_min" placeholder='Min' onChange={handleChange} value={input.height_min}/>
          <span>Cm</span>
          <input type="text" name="height_max" placeholder='Max' onChange={handleChange} value={input.height_max}/>
          <span>Cm</span>
        </div>
        <div>
          <p>Peso*</p>
          <input type="text" name="weight_min" placeholder='Min' onChange={handleChange} value={input.weight_min}/>
          <span>Kg</span>
          <input type="text" name="weight_max" placeholder='Max' onChange={handleChange} value={input.weight_max}/>
          <span>Kg</span>
        </div>
        <div>
          <p>Años</p>
          <input type="text" name="life_min" placeholder='Min' onChange={handleChange} value={input.life_min}/>
          <span>Años</span>
          <input type="text" name="life_max" placeholder='Max' onChange={handleChange} value={input.life_max}/>
          <span>Años</span>
        </div>
        <div>
          <p>Temperamento</p>
          <select name="temperament" onChange={handleSelect}>
            {temperaments?.map(temper =>
              <option value={temper} key={temper}>{temper}</option>
              )}
          </select>
        </div>
        <div>
          <ul>
              {input.temperament?.map( (temper, i) => {
                return (
                  <li key={i}>
                    {temper}
                    <button type='button' value={temper} onClick={handleDeleteTemper}>x</button>
                  </li>
                )
              })}
          </ul>
        </div>
        <div>
          <input type='submit' value='adoptar' className={errors.name || errors.height_min || errors.height_max || errors.weight_min || errors.weight_max ? "noSubmit" : "submit"} />
        </div>
      </form>
    </div>
  )
}
