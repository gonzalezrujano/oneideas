import { combineReducers } from 'redux';
import auth from './auth';
import multimedia from './multimedia';

export default combineReducers({
  auth,
  multimedia
});
