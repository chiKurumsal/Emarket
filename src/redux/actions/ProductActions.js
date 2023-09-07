import axios from 'axios';
import {
  PRODUCT_LIST,
  CART_ADD,
  CART_DELETE,
  COUNT_CHANGE,
  CART_DECREASE,
  FAVORITE_ADD,
  STORAGE_CART_LIST,
  STORAGE_FAV_LIST,
} from './type';

export const productList = () => {
  return dispatch => {
    axios
      .get('https://5fc9346b2af77700165ae514.mockapi.io/products')
      .then(response => {
        dispatch({
          type: PRODUCT_LIST,
          payload: response.data,
        });
      })
      .catch(err => {
        console.log('Error----->', err);
      });
  };
};

export const cartAdd = cart => {
  return dispatch => {
    dispatch({
      type: CART_ADD,
      payload: cart,
    });
  };
};

export const cartDelete = productId => {
  return dispatch => {
    dispatch({
      type: CART_DELETE,
      payload: productId,
    });
  };
};

export const countChange = (productId, num) => {
  return dispatch => {
    dispatch({
      type: COUNT_CHANGE,
      payload: {productId, num},
    });
  };
};

export const cartDecrease = productId => {
  return dispatch => {
    dispatch({
      type: CART_DECREASE,
      payload: productId,
    });
  };
};

export const favoriteAdd = favorite => {
  return dispatch => {
    dispatch({
      type: FAVORITE_ADD,
      payload: favorite,
    });
  };
};

export const storageCartList = (cartList)=>{
  return dispatch => {
    dispatch({
      type: STORAGE_CART_LIST,
      payload: cartList,
    });
  };
}

export const storageFavList = (favList)=>{
  return dispatch => {
    dispatch({
      type: STORAGE_FAV_LIST,
      payload: favList,
    });
  };
}
