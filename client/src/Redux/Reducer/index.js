import { FILTER_CREATED, FILTER_DOG, GET_ALL_DOGS, GET_TEMPERAMENT, POST_DOG } from '../Actions/Actions.js'


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
    default:
      return {...state}
  }
}


