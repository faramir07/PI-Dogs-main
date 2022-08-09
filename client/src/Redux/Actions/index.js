import axios from 'axios';
import { FILTER_CREATED, DOG_SEARCH, GET_DETAILS, ORDER_WEIGHT, ORDER_ALPHABET, FILTER_DOG, GET_ALL_DOGS, GET_TEMPERAMENT, POST_DOG } from './Actions'

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

export const filterCreate = (payload) => {
  return {
    type: FILTER_CREATED,
    payload
  }
}

export const filterDog = (payload) => {
  return {
    type: FILTER_DOG,
    payload
  }

}

  export const orderAlphabet = (payload) => {
    return {
      type: ORDER_ALPHABET,
      payload
    }
  }

  export const OrderWeight = (payload) => {
    return {
      type: ORDER_WEIGHT,
      payload
    }
  }

  export const deatailDog = (payload) => {
    return async function (distpach) {
      try {
        const dog = (await axios.get(`http://localhost:3001/dogs/${payload}`)).data
        return distpach({
          type: GET_DETAILS,
          payload: dog
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  export const searchDog = (payload) => {
    return async function(dispatch) {
      try {
        let dogsWanted = (await axios(`http://localhost:3001/dogs/?name=${payload}`)).data;
        return dispatch({
          type: DOG_SEARCH,
          payload: dogsWanted
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

