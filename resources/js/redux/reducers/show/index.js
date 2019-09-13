import { } from '../../actions/show/types';

const initialState = {
  color: {
    running: false,
    icon: 'palette',
    color: '#4b7bec',
    current: null,
    queue: [],
  },
  flash: {
    running: true,
    icon: 'bolt',
    color: '#eb3b5a',
    current: {},
    queue: [],
  },
  audio: {
    running: false,
    icon: 'volume-up',
    color: '#2bcbba',
    current: {},
    queue: [],
  },
  video: {
    running: false,
    icon: 'video',
    color: '#fed330',
    current: null,
    queue: [],
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}