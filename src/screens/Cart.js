import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {cartAdd, cartDecrease} from '../redux/actions';

const windowWidth = Dimensions.get('window').width;

const Cart = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  const addToCart = id => {
    const prod = product.products.find(e => e.id == id);
    dispatch(cartAdd({product: prod, count: 1}));
  };
  const decreaseToCart = id => {
    const prod = product.products.find(e => e.id == id);
    dispatch(cartDecrease({product: prod, count: 1}));
  };

  const total = () => {
    let toplam = 0;
    if (product.cartList.length > 0) {
      product.cartList.forEach(element => {
        toplam = toplam + element.count * element.product.price;
      });
    }
    return toplam;
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <ScrollView>
        {product.cartList != undefined || product.cartList != '' ? (
          <View>
            {product.cartList.map(e => (
              <View style={styles.CartContainer}>
                <View>
                  <Text style={styles.Title}>{e.product.name}</Text>
                  <Text style={styles.SubTitle}>{e.product.price} ₺</Text>
                </View>
                <View style={styles.ButtonContainer}>
                  <TouchableOpacity
                    onPress={() => decreaseToCart(e.product.id)}
                    style={styles.Button}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <View style={styles.Count}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      {e.count}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => addToCart(e.product.id)}
                    style={styles.Button}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: windowWidth / 2 - 80}}>
          <Text style={styles.BottomTitle}>Total:</Text>
          <Text style={styles.BottomSubTitle}>{total()} ₺</Text>
        </View>
        <TouchableOpacity
          style={styles.AddButton}>
          <Text style={styles.AddButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  CartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ButtonContainer: {
    width: windowWidth / 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCDAE9',
  },
  Count: {
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  Title: {
    fontSize: 16,
    color: '#3C3C3C',
    fontWeight: '600',
  },
  SubTitle: {
    fontSize: 14,
    color: '#0F75E0',
    fontWeight: '600',
  },
  AddButton: {
    backgroundColor: '#0F75E0',
    width: windowWidth / 2,
    padding: 8,
    borderRadius: 3,
  },
  AddButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  BottomTitle: {
    fontSize: 16,
    color: '#3C3C3C',
  },
  BottomSubTitle:{
    fontSize: 16,
    color: '#0F75E0',
    fontWeight:'bold'
  },
});
