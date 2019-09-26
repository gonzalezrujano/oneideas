import { 
  AUTH_EXAMPLE_ACTION,
  USER_LOGGED_IN
} from './types';
import axios from 'axios';

export function authenticate (email, password) {
  return dispatch => {
    return axios.post('api/login', { correo: email, password })
      .then(res => {
        const { data } = res;

        if (data.code !== 200)
          return Promise.reject({ code: data.code, message: data.msj });

        dispatch(userLoggedIn(data.api_token, data.usuario));

        return data;
      });
  }
}

export function userLoggedIn (apiToken, user) {
  return {
    type: USER_LOGGED_IN,
    payload: { apiToken, user }
  };
}

export const authExample = () => ({
  type: AUTH_EXAMPLE_ACTION,
  payload: { name: 'Jhon', lastname: 'Doe' }
});