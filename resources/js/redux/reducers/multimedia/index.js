import { 
  FETCHED_MEDIA_EVENTS,
  FETCHED_MEDIA_SECTOR,
  FETCHED_MEDIA_JOBS
} from '../../actions/multimedia/types';

const initialState = {
  eventos: [],
  sectores: [],
  jobs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHED_MEDIA_EVENTS:
      return {
        ...state,
        eventos: action.payload
      };
    case FETCHED_MEDIA_SECTOR:
      return {
        ...state,
        sectores: action.payload
      };
    case FETCHED_MEDIA_JOBS:
      return {
        ...state,
        jobs: action.payload
      };
    default:
      return state;
  }
}