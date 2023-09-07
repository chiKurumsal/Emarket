import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import Navigation from './Navigation';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageCartList, storageFavList } from '../redux/actions';

const RootNavigation = () => {
  const dispatch = useDispatch();

  useEffect(async()=>{
    const storage = await AsyncStorage.getItem('cartList');
    if(storage != null && storage != ''){
      dispatch(storageCartList(JSON.parse(storage)));
    }
    
    const storageFav = await AsyncStorage.getItem('favList');
    if(storageFav!= null && storageFav!= ''){
      dispatch(storageFavList(JSON.parse(storageFav)));
    }
    
  },[]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
