import { combineReducers } from 'redux';
import auth from './auth';
import multimedia from './multimedia';
import show from './show';

export default combineReducers({
  auth,
  show,
  multimedia
});
