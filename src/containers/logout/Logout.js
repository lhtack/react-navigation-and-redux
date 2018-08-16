/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchData, setAuthToken } from '../../actions';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>Logout</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.setAuthToken('');
          }}
        >
          <Text>退出登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#ffb602',
    borderRadius: 15,
    width: 140,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// 这里是将store里的数据映射到Class的Props上
const mapStateToProps = state => {
  return {
    counter: state.common.counter,
  };
};

// 这里是将动作绑定到store的dispatch，触发动作后会异步调用到reducer/saga那边
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchData,
      setAuthToken,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
