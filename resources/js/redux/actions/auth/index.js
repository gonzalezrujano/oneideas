import { 
  AUTH_EXAMPLE_ACTION
} from './types';

export const authExample = () => ({
  type: AUTH_EXAMPLE_ACTION,
  payload: { name: 'Jhon', lastname: 'Doe' }
});