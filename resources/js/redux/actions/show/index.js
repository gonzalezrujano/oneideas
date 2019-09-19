import { } from './types';
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