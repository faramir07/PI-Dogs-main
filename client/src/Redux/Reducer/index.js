import { FILTER_CREATED, GET_ALL_DOGS, GET_TEMPERAMENT, POST_DOG } from '../Actions/Actions.js'


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
          case FILTER_CREATED:
            const allDogsFilter = state.allDogsFilter;
            const creatdDogs = payload === 'Creados' ? allDogsFilter.filter(dog => dog.createDb) : allDogsFilter.filter(dog => !dog.createDb)
            console.log('alldogs:',  allDogsFilter);
            console.log('creatdDogs:',  creatdDogs);
            return {
              ...state,
              allDogs: payload === 'Todos' ? allDogsFilter : creatdDogs
            }
    default:
      return {...state}
  }
}


