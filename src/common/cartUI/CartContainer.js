import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CartContainer = ({children}) => {
  return <View style={styles.CartContainer}>{children}</View>;
};

export default CartContainer;

const styles = StyleSheet.create({
  CartContainer: {
    width: windowWidth / 2 - 25,
    height: windowHeight / 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom:8
  },
});
