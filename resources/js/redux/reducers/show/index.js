import {
  END_RUNNING_SHOW,
  SET_CURRENT_SCENE,
  END_CURRENT_SCENE,
  UPDATE_CURRENT_LOOP,
  END_CURRENT_SCENE_TIME
} from '../../actions/show/types';

const initialState = {
  color: {
    icon: 'palette',
    color: '#4b7bec',
    current: null,
    queue: [],
  },
  flash: {
    icon: 'bolt',
    color: '#eb3b5a',
    current: null,
    queue: [],
  },
  audio: {
    icon: 'volume-up',
    color: '#2bcbba',
    current: null,
    queue: [],
  },
  video: {
    icon: 'video',
    color: '#fed330',
    current: null,
    queue: [],
  },
  image: {
    icon: 'image',
    color: '#a55eea',
    current: null,
    queue: [],
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_SCENE:
      return {
        ...state,
        [action.payload.scene]: {
          ...state[action.payload.scene],
          current: action.payload.current
        }
      }
    case END_CURRENT_SCENE:
      return {
        ...state,
        [action.payload.scene]: null,
      }
    case END_CURRENT_SCENE_TIME:
      return {
        ...state,
        [action.payload.scene]: {
          ...state[action.payload.scene],
          current: {
            ...state[action.payload.scene].current,
            time: 0,
          }
        }
      }
    case UPDATE_CURRENT_LOOP: 
      return {
        ...state,
        [action.payload.scene]: {
          ...state[action.payload.scene],
          current: {
            ...state[action.payload.scene].current,
            loop: action.payload.loop,
          }
        }
      };
    case END_RUNNING_SHOW:
      return {
        ...state,
        [action.payload.scene]: {
          ...state[action.payload.scene],
          current: null,
        },
      }
    default:
      return state;
  }
}