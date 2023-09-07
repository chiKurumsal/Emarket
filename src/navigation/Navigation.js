import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from '../screens/ProductList';
import Profile from '../screens/Profile';
import FavoriteList from '../screens/FavoriteList';
import Cart from '../screens/Cart';
import ProductDetail from '../screens/ProductDetail';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as IconSet from '../assets/icons';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const Navigation = () => {
  const cart=useSelector(state=>state.product.cartList);
  console.log('cart', cart)
  return (
    <Tab.Navigator screenOptions={{headerShown: true}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Anasayfa',
          tabBarIcon: ({color, size}) => (
            <IconSet.Home height={30} width={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Sepetim',
          tabBarIcon: ({color, size}) => (
            <View style={{display: 'flex', alignItems: 'center'}}>
              <IconSet.Cart height={30} width={30} />
              {cart.length >0 ? (
                <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: 'red',
                  borderRadius: 15,
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
              </View>
              ): null}
              
            </View>
          ),
          labelStyle: {
            disable: 'none',
          },
        }}
      />
      <Tab.Screen
        name="FavoriteList"
        component={FavoriteList}
        options={{
          title: 'Favorilerim',
          tabBarIcon: ({color, size}) => (
            <IconSet.StarGrey height={30} width={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profil',
          tabBarIcon: ({color, size}) => (
            <IconSet.Profile height={30} width={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
