import React, { useEffect } from 'react';
import {Provider, useDispatch} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/redux/reducer';
import RootNavigation from './src/navigation/RootNavigation';
import ProductDetail from './src/screens/ProductDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageCartList } from './src/redux/actions';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const App = () => {
  
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;


/* test('examples of some things', async () => {
  
  render(<Example />);

  fireEvent.changeText(screen.getByTestId('searchInput'), "Audi");
  fireEvent.changeText(
    screen.getByTestId('searchModalInput'),
    expectedUsername,
  );

  fireEvent.press(screen.getByText('Print Username'));

  // Using `findBy` query to wait for asynchronous operation to finish
  const usernameOutput = await screen.findByTestId('printed-username');

  // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
  expect(usernameOutput).toHaveTextContent(expectedUsername);

  expect(screen.toJSON()).toMatchSnapshot();
});
 */