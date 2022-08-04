import { GET_ALL_DOGS, GET_TEMPERAMENT, POST_DOG } from '../Actions/Actions.js'


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
      };
      case GET_TEMPERAMENT:
        return {
          ...state,
          temperaments: payload,
        };
        case POST_DOG:
          return {
            ...state
          }
    default:
      return {...state}
  }
}
