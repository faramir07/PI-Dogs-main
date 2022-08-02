import { GET_ALL_DOGS } from '../Actions/Actions.js'


const initialState = {
  allDogs: [],
  allDogsFilter: [],
  details: [],
  temperaments: [],
  dogsHome: [],
};

export default function reducer(state = initialState, { type, payload }){
  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: payload,
        allDogsFilter: payload,
        dogsHome: payload,
      }
    default:
      return {...state}
  }
}
