import {
  PRODUCT_LIST,
  CART_ADD,
  CART_DELETE,
  COUNT_CHANGE,
  CART_DECREASE,
  FAVORITE_ADD,
  STORAGE_CART_LIST,
  STORAGE_FAV_LIST,
} from '../actions/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
  products: [],
  cartList: [],
  favoriteList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return {...state, products: action.payload};
    case CART_ADD:
      const newArr = state.cartList;

      const c = newArr.find(e => e.product.id == action.payload.product.id);

      if (c) {
        console.log('c', c);
        c.count = c.count + 1;
        AsyncStorage.setItem('cartList', JSON.stringify(newArr));
        return {...state, cartList: newArr};
      } else {
        console.log('else');
        AsyncStorage.setItem('cartList', JSON.stringify([...state.cartList, action.payload]));
        return {...state, cartList: [...state.cartList, action.payload]};
      }
    case CART_DECREASE:
      const newArray = state.cartList;
      const ca = newArray.find(e => e.product.id == action.payload.product.id);
      if (ca) {
        const deger = ca.count - 1;
        ca.count = deger;
        if (deger == 0) {
          const index = newArray.indexOf(ca);
          if (index > -1) {
            newArray.splice(index, 1);
          }
          AsyncStorage.setItem('cartList', JSON.stringify(newArray));
          return {...state, cartList: newArray};
        } else {
          AsyncStorage.setItem('cartList', JSON.stringify(newArray));
          return {...state, cartList: newArray};
        }
      } else {
        AsyncStorage.setItem('cartList', JSON.stringify([...state.cartList, action.payload]));
        return {...state, cartList: [...state.cartList, action.payload]};
      }
    case FAVORITE_ADD:
      const newFavArr = state.favoriteList;
console.log('newFavArr[0]---------->',newFavArr[0])
      const f = newFavArr.find(e => e.id == action.payload.id);
      if (f) {
        const index = newFavArr.indexOf(f);
        console.log('index------->', index)
        if (index > -1) {
          newFavArr.splice(index, 1);
        }
      } else {
        console.log('geldi mi')
        newFavArr.push(action.payload);
      }
      AsyncStorage.setItem('favList', JSON.stringify(newFavArr))
      return {...state, favoriteList: newFavArr};
    case STORAGE_CART_LIST:
      return {...state, cartList: action.payload};
    case STORAGE_FAV_LIST:
      return {...state, favoriteList: action.payload}
    default:
      return state;
  }
};
