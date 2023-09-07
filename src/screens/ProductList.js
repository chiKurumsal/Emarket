import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import CartContainer from '../common/cartUI/CartContainer';
import {useDispatch, useSelector} from 'react-redux';
import {
  cartAdd,
  favoriteAdd,
  productList,
  storageCartList,
} from '../redux/actions';
import * as IconSet from '../assets/icons';
import {render, screen, fireEvent} from '@testing-library/react-native';

const windowWidth = Dimensions.get('window').width;

const ProductList = props => {
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProducts, setSelectedProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState([]);
  const [selectBrand, setSelectBrand] = useState('');
  const products = useSelector(state => state.product);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    dispatch(productList());
  }, []);

  useEffect(() => {
    productShortList();
  }, [products.products.length]);

  const productShortList = () => {
    let arr = products.products;
    let arrShort = arr.slice(0, 12 * page);
    setSelectedProduct(arrShort);
    const array = Array.from(
      new Set(products.products.map(item => item.brand)),
    );
    const sira = array.sort();
    setBrand(sira);
  };

  const showMore = () => {
    let p = page + 1;
    setPage(p);
    if (products.products.length < p * 12) {
     
      setSelectedProduct(products.products);
    } else {
      console.log('else mi girdi', products.products.slice(0, 12 * p).length);
      setSelectedProduct(products.products.slice(0, 12 * p));
    }
  };

  const addToCart = id => {
    const prod = products.products.find(e => e.id == id);
    console.log('prod--->', prod);
    dispatch(cartAdd({product: prod, count: 1}));
  };

  const addToFavorite = id => {
    const prod = products.products.find(e => e.id == id);
    console.log('prodfavorite--->', prod);
    dispatch(favoriteAdd(prod));
  };

  /* const footerIndicator = () => {
    return loading ? (
      <View
        style={{
          paddingVertical: 20,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    ) : null;
  }; */
  const searchButton = text => {
    let filtered = products.products.filter(e =>
      e.name.toUpperCase().includes(text.toUpperCase()),
    );
    setSelectedProduct(filtered);
  };

  const searchFilterButton = b => {
    let filtered = brand.filter(e => e.toUpperCase().includes(b.toUpperCase()));
    setBrand(filtered);
  };

  const filterButton = brand => {
    console.log(brand);
    setModalVisible(false);
    let arr = products.products.filter(e => e.brand == brand);
    console.log(arr);
    // // let arrShort = arr.slice(0, 12 * page);
    setSelectedProduct(arr);
  };

  const resetButton = () => {
    setPage(1);
    let arr = products.products;
    let arrShort = arr.slice(0, 12);
    setSelectedProduct(arrShort);
    const array = Array.from(
      new Set(products.products.map(item => item.brand)),
    );
    const sira = array.sort();
    setBrand(sira);
  };
  return (
    <View style={styles.ListContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}>
        <View style={styles.SearchBox}>
          <IconSet.Search height={20} width={20} />
          <TextInput
            placeholder="Search"
            style={styles.SearchInput}
            onChangeText={event => searchButton(event)}
            testID="searchInput"
          />
        </View>
        <TouchableOpacity
          style={styles.FilterIcon}
          onPress={() => setModalVisible(true)}>
          <IconSet.Filter height={20} width={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetButton()}>
          <IconSet.PowerOff height={20} width={20} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.SearchModalBox}>
              <IconSet.Search height={20} width={20} />
              <TextInput
                placeholder="Search"
                style={styles.SearchModalInput}
                onChangeText={event => searchFilterButton(event)}
                testID="searchModalInput"
              />
            </View>
            <FlatList
              data={brand}
              style={{marginTop: 16, marginBottom: 16}}
              renderItem={({item}) => (
                <View style={styles.ModalButtonContainer}>
                  <TouchableOpacity
                    style={styles.Button}
                    onPress={() => filterButton(item)}>
                    <Text style={styles.ModalButtonText}>{item}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Kapat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{flex: 9}}>
        <FlatList
          data={selectedProducts}
          numColumns={2}
          columnWrapperStyle={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 5,
          }}
          /* onEndReached={showMore()}
          ListFooterComponent={footerIndicator()}
          onEndReachedThreshold={0.5} */
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ProductDetail', {data: item})
              }>
              <CartContainer>
                <View style={styles.ImageContainer}>
                  <Image
                    source={{uri: item.image}}
                    alt=""
                    style={styles.Image}
                  />
                  <TouchableOpacity
                    style={styles.FavoriteButton}
                    onPress={() => addToFavorite(item.id)}>
                    {console.log(
                      'products.favoriteList------>',
                      products.favoriteList,
                    )}
                    {products.favoriteList != '' ? (
                      <View>
                        {products.favoriteList.find(e => e.id == item.id) ? (
                          <IconSet.StarOrange height={20} width={20} />
                        ) : (
                          <IconSet.StarGrey height={20} width={20} />
                        )}
                      </View>
                    ) : (
                      <IconSet.StarGrey height={20} width={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={styles.TitleText}>{item.price} ₺</Text>
                <Text style={styles.SubTitleText}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => addToCart(item.id)}
                  style={styles.AddButton}>
                  <Text style={styles.AddButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </CartContainer>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.showMoreButton} onPress={()=>showMore()}>
          <Text  style={styles.showMoreText}>Daha Fazla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ProductList;

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  ImageContainer: {
    width: '100%',
    height: windowWidth / 2 - 50,
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  TitleText: {
    color: '#0F75E0',
    fontSize: 16,
  },
  SubTitleText: {
    color: '#3C3C3C',
    fontSize: 18,
  },
  AddButton: {
    backgroundColor: '#0F75E0',
    width: '100%',
    padding: 8,
    borderRadius: 3,
  },
  AddButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  FilterIcon: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FavoriteButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  SearchBox: {
    width: windowWidth - 100,
    height: 40,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    borderColor: '#d2d7e0',
    borderWidth: 0.6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  SearchInput: {
    width: windowWidth - 120,
    height: 30,
    color: '#3C3C3C',
    fontSize: 16,
    marginLeft: 5,
    padding: 5,
  },
  SearchModalBox: {
    width: windowWidth - 120,
    height: 40,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    borderColor: '#d2d7e0',
    borderWidth: 0.6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  SearchModalInput: {
    width: windowWidth - 200,
    height: 30,
    color: '#3C3C3C',
    fontSize: 16,
    marginLeft: 5,
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: windowWidth - 60,
    height: windowWidth * 1.8,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: windowWidth - 140,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  ModalButtonContainer: {
    width: windowWidth - 140,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#B6B6B6',
  },
  Button: {
    width: '100%',
  },
  showMoreButton:{
    width:windowWidth,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:16
  },
  showMoreText:{
    color:'#0F75E0'
  }
});
