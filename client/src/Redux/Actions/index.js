import axios from 'axios';
import { GET_ALL_DOGS, GET_TEMPERAMENT, POST_DOG } from './Actions'

export const getAllDogs = () => {
  return async function(dispatch) {
    try {
      let allDogs = (await axios('http://localhost:3001/dogs')).data
      return dispatch({
        type: GET_ALL_DOGS,
        payload: allDogs
      })
    } catch (error) {
      console.log(error);
    }
  }
};

export const getTemperament = () => {
  return async function(dispatch) {
    try {
      let temperaments = (await axios('http://localhost:3001/temperaments')).data
      return dispatch({
        type: GET_TEMPERAMENT,
        payload: temperaments,
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const postDog = (payload) => {
  return async function (dispatch) {
    try {
      await axios.post('http://localhost:3001/create', payload);
      alert("tenemos un peludo para ti ve a 'home'");
      return dispatch({
        type: POST_DOG,
      })
    } catch (error) {
      console.log(error);
      alert('no tenemos peludos con esas caracteristicas');
    }
    
  }
}


