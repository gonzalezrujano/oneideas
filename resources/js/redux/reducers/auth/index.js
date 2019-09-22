import { 
  AUTH_EXAMPLE_ACTION
} from './../../actions/auth/types';

const initialState = {
  isAuthenticated: false,
  name: '',
  lastname: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_EXAMPLE_ACTION:
      return {
        ...state,
        name: action.payload.name,
        lastname: action.payload.lastname,
      };
    default:
      return state;
  }
}