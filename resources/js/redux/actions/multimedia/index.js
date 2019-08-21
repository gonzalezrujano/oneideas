import {
  FETCHED_MEDIA_EVENTS,
  FETCHED_MEDIA_SECTOR,
  FETCHED_MEDIA_JOBS,
  FETCHED_MEDIA_TOOLS
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

export function getTool (eventId, herramienta) {
  return (dispatch, getState) => {
    const { auth } = getState();

    return axios.post('/api/multimedia/action-tool', { 
      evento: eventId, 
      herramienta
    } , {
      headers: {
          Authorization: localStorage.getItem("api_token")
      }
    })
    .then(res => {
      const { code, tool, biblioteca, msj } = res.data;

      if(code === 200){
        
        let payload = {
          isTool: true,
          titleTool: herramienta,
          bibliotecas: (tool == 'Video' || tool == 'Imagen' || tool == 'Audio') ? biblioteca : []
        };

        dispatch(saveTool(payload));
          
      } else {
        dispatch(saveTool({ isTool: false, titleTool: '' }));
      }

      return { code, msj };
    }, err => dispatch(saveTool({ isTool: false, titleTool: '' })));
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

export function saveTool (tools) {
  return {
    type: FETCHED_MEDIA_TOOLS,
    payload: tools
  }
}