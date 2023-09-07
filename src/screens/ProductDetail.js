import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as IconSet from '../assets/icons';
import {cartAdd, favoriteAdd} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
const windowWidth = Dimensions.get('window').width;

const ProductDetail = ({route, navigation}) => {
  const favorite = useSelector(state => state.product.favoriteList);
  console.log('favorite', favorite);
  const [data, setData] = useState(route.params.data);

  const dispatch = useDispatch();

  const addToFavorite =  () => {
     dispatch(favoriteAdd(data));
  };


  return (
    <View style={styles.DetailContainer}>
      <ScrollView>
        <View style={styles.DetailBox}>
          <View style={styles.ImageBox}>
            <Image source={{uri: data.image}} alt="" style={styles.Image} />
            <TouchableOpacity
              style={styles.FavoriteButton}
              onPress={() => addToFavorite()}>
              {favorite.find(e => e.id == data.id) ? (
                <IconSet.StarOrange height={20} width={20} />
              ):(
                <IconSet.StarGrey height={20} width={20} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.Title}>{data.name}</Text>
          <Text style={styles.SubTitle}>{data.description}</Text>
        </View>
      </ScrollView>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: windowWidth / 2 - 80}}>
          <Text style={styles.BottomTitle}>Price:</Text>
          <Text style={styles.BottomSubTitle}>{data.price} ₺</Text>
        </View>
        <TouchableOpacity
          onPress={() => dispatch(cartAdd({product: data, count: 1}))}
          style={styles.AddButton}>
          <Text style={styles.AddButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  DetailContainer: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  DetailBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  ImageBox: {
    width: windowWidth - 30,
    height: 200,
    borderRadius: 5,
  },
  FavoriteButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F75E0',
    marginTop: 16,
  },
  SubTitle: {
    fontSize: 16,
    marginTop: 8,
    color: '#3C3C3C',
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
  BottomSubTitle: {
    fontSize: 16,
    color: '#0F75E0',
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});
