import {
  FETCHED_MEDIA_EVENTS,
  FETCHED_MEDIA_SECTOR,
  FETCHED_MEDIA_JOBS
} from './types';
import axios from 'axios';

export function getEventos (userId, apiToken) {
  return dispatch => {
    return axios.get(`/api/eventos/usuario/${userId}`, {
      headers: {
          Authorization: apiToken
      }
    }).then(res => {
      const { data } = res.data;
      
      localStorage.setItem("eventosUsuario", JSON.stringify(data));
      
      dispatch(saveEventos(data.eventos));
      dispatch(saveSectores(data.sectores));
    });
  }
}

export function getJobs (eventId, apiToken) {
  return dispatch => {
    return axios.post("/api/eventos/envios", { evento: eventId }, {
        headers: {
            Authorization: apiToken
        }
      })
      .then(res => {
        const { code, envios } = res.data;

        dispatch(saveJobs(envios));
        
        return code;
      });
  }
}

export function saveEventos (eventos) {
  return {
    type: FETCHED_MEDIA_EVENTS,
    payload: eventos,
  };
}

export function saveSectores (sectores) {
  return {
    type: FETCHED_MEDIA_SECTOR,
    payload: sectores
  };
}

export function saveJobs (jobs) {
  return {
    type: FETCHED_MEDIA_JOBS,
    payload: jobs
  };
}