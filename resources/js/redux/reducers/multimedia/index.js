import { 
  FETCHED_COMPANIES,
  FETCHED_MEDIA_EVENTS,
  FETCHED_MEDIA_SECTOR,
  FETCHED_MEDIA_JOBS,
  CREATE_NEW_JOB,
  REMOVE_JOB,
  FETCHED_MEDIA_TOOLS
} from '../../actions/multimedia/types';

const initialState = {
  companies: [],
  eventos: [],
  sectores: [],
  jobs: [],
  tool: {
    isTool: false,
    titleTool: '',
    bibliotecas: [],
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHED_COMPANIES:
      return {
        ...state,
        companies: action.payload.companies.map(mapCompanyFromDbToStore),
      }
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
    case CREATE_NEW_JOB: 
      return {
        ...state,
        jobs: [...state.jobs, action.payload]
      };
    case REMOVE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload.id)
      };
    case FETCHED_MEDIA_TOOLS:
      return {
        ...state,
        tool: action.payload
      };
    default:
      return state;
  }
}

function mapCompanyFromDbToStore (company) {
  return {
    id: company._id,
    name: company.Nombre,
    email: company.Correo,
    phone: company.Telefono,
    countryId: company.Pais_id,
    active: company.Activo,
  }
}