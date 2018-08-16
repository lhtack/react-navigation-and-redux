import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import configureStore from './store/configureStore';

import ErrorInfo from './containers/errorInfo';
import Loading from './containers/loading';
import OverlayContainer from './containers/overlayContainer';
import Router from './containers/Router';

const store = configureStore();

export default class Root extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Router />
          <OverlayContainer />
          <Loading />
          <ErrorInfo />
        </View>
      </Provider>
    );
  }
}
