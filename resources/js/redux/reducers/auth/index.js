import { 
  AUTH_EXAMPLE_ACTION,
  USER_LOGGED_IN
} from './../../actions/auth/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  apiToken: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN: 
      return {
        ...state,
        isAuthenticated: true,
        user: mapUserFromDbToStore(action.payload.user),
        apiToken: action.payload.apiToken, 
      };  
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

function mapUserFromDbToStore (user) {
  return {
    id: user._id,
    name: user.Nombre,
    lastname: user.Apellido,
    email: user.Correo,
    roleId: user.Rol_id,
    countryId: user.Pais_id,
    companyId: user.Empresa_id,
    active: true,
  }
}