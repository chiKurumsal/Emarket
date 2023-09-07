import {combineReducers} from 'redux';
import ProductReducer from './ProductReducer';

export default combineReducers({
  product: ProductReducer,
});
