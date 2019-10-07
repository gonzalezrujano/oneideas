import { combineReducers } from 'redux';
import auth from './auth';
import multimedia from './multimedia';
import show from './show';
import alert from './alert';
import loader from './loader';

export default combineReducers({
  auth,
  show,
  alert,
  multimedia,
  loader
});
