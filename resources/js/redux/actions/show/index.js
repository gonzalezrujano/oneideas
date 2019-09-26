import { 
  END_RUNNING_SHOW,
  SET_CURRENT_SCENE,
  END_CURRENT_SCENE,
  END_CURRENT_SCENE_TIME,
  UPDATE_CURRENT_LOOP
} from './types';
import axios from 'axios';

export function getFilesFromEvent (type) {
  return (_, getState) => {
    const { multimedia: { companyId, eventId }, auth: { apiToken } } = getState();

    return axios.get(`api/empresas/${companyId}/event/${eventId}/files/${type}`, {
      headers: {
        Authorization: apiToken
      }
    })
    .then(res => {
      console.log(res.data);
      
      return res.data;
    })
  }
}

export function endRunningShow (scene) {
  return {
    type: END_RUNNING_SHOW,
    payload: { scene }
  };
}

export function setCurrentScene (scene, current) {
  return {
    type: SET_CURRENT_SCENE,
    payload: { scene, current }
  };
}

export function endCurrentScene (scene) {
  return {
    type: END_CURRENT_SCENE,
    payload: { scene }
  }
}

export function endCurrentSceneTime (scene) {
  return {
    type: END_CURRENT_SCENE_TIME,
    payload: { scene },
  };
}

export function updateCurrentLoop (scene, loop) {
  return {
    type: UPDATE_CURRENT_LOOP,
    payload: { scene, loop }
  };
}