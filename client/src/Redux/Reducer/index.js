import { FILTER_CREATED, GET_DETAILS, ORDER_WEIGHT, FILTER_DOG, GET_ALL_DOGS, GET_TEMPERAMENT, ORDER_ALPHABET, POST_DOG } from '../Actions/Actions.js'


const initialState = {
  allDogs: [],
  allDogsFilter: [],
  dogDetails: [],
  temperaments: [],
  dogsDetail: [],
};

export default function reducer(state = initialState, { type, payload }){
  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: payload.filter(dog => !dog.createDb),
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
        };
      case FILTER_CREATED:
        const allDogsFilter = state.allDogsFilter;
          const creatdDogs = payload === 'Creados' ? allDogsFilter.filter(dog => dog.createDb) : allDogsFilter.filter(dog => !dog.createDb)
          return {
            ...state,
            allDogs: payload === 'Todos' ? allDogsFilter : creatdDogs
          };
      case FILTER_DOG:
        const allDogstemper = state.allDogsFilter;
          const filtrotemper = payload === 'all' ? allDogstemper : allDogstemper.filter(e => e.temperament.includes(payload))
        return {
            ...state,
            allDogs: filtrotemper
        };
      case ORDER_ALPHABET:
        const orderAlphabet = payload === 'A-Z' ?
        state.allDogs.slice().sort(function(a, b) {
          if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
          if(b.name.toLowerCase() < a.name.toLowerCase()) {return 1}
          return 0;
        }) :
          state.allDogs.slice().sort(function(a, b) {
            if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
            if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
            return 0;
          })
        return {
          ...state,
          allDogs: orderAlphabet
        };
      case ORDER_WEIGHT:
        const orderWeight = payload === '0-9' ?
        state.allDogs.slice().sort(function(a, b) {
          if(parseInt(a.weight_min) < parseInt(b.weight_min)) {return -1}
          if(parseInt(b.weight_min) < parseInt(a.weight_min)) {return 1}
          return 0;
        }) :
          state.allDogs.slice().sort(function(a, b) {
            if(parseInt(a.weight_min) > parseInt(b.weight_min)) {return -1}
            if(parseInt(a.weight_min) > parseInt(b.weight_min)) {return 1}
            return 0;
          })
        return {
          ...state,
          allDogs: orderWeight
        };
        case GET_DETAILS:
          return {
            ...state,
            dogDetails: payload
          };
    default:
      return {...state}
  }
}


