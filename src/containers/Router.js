import { connect } from 'react-redux';
import { View } from 'react-native';
import React, { Component } from 'react';

import { TabBar } from './navigationConfiguration';
import Login from './login';

class Router extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { authToken } = this.props;

    if (authToken) {
      return (
        <View style={{ flex: 1 }}>
          <TabBar />
        </View>
      );
    } else {
      return <Login />;
    }
  }
}

// 这里是没有使用装饰器的传统写法
const mapStateToProps = state => {
  return {
    authToken: state.coreData.authToken,
  };
};

export default connect(
  mapStateToProps,
  null
)(Router);
