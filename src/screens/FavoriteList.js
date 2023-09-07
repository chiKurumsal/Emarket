import {FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as IconSet from '../assets/icons';
import { favoriteAdd } from '../redux/actions';

const windowWidth = Dimensions.get('window').width;

const FavoriteList = () => {
  const dispatch = useDispatch();
  const favorite = useSelector(state => state.product.favoriteList);
  const products = useSelector(state => state.product);

  const addToFavorite = id => {
    const prod = products.products.find(e => e.id == id);
    console.log('prodfavorite--->', prod);
    dispatch(favoriteAdd(prod));
  };

  return (
    <View style={styles.FavoriteContainer}>
      {console.log(favorite)}
      <FlatList
        data={favorite}
        renderItem={(item) => (
          <View style={styles.FavoriteBox}>
            {console.log('item------------>', item)}
            <View style={styles.ImageBox}>
              <Image source={{uri: item.item.image}} alt='' style={styles.Image} />
            </View>
            <Text style={{width:windowWidth/3, textAlign:'center'}}>{item.item.name}</Text>
            <TouchableOpacity onPress={()=> addToFavorite(item.item.id)}>
              <IconSet.StarOrange height={30} width={30} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text>{console.log(favorite)}</Text>
    </View>
  );
};

export default FavoriteList;

const styles = StyleSheet.create({
  FavoriteContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  FavoriteBox: {
    width: windowWidth - 60,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  ImageBox: {
    width: windowWidth/4-20,
    height: windowWidth/4-20,
  },
  Image:{
    width:'100%',
    height:'100%',
    borderRadius:10,
    resizeMode:'stretch'
  }
});
