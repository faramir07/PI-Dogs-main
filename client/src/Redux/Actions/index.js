import axios from 'axios';
import { GET_ALL_DOGS } from './Actions'

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
