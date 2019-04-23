/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchData, increment, decrement } from "../../actions";
import { iconWorkCenter } from "../../assets/";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

// 这里使用了装饰器进行了绑定，比较简便的写法 用到了babel插件"babel-plugin-transform-decorators-legacy"
class FirstTab extends Component<Props> {
  static navigationOptions = {
    header: null // 这里隐藏标题
  };

  render() {
    const { counter } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>FirstTab</Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "yellow"
            }}
            onPress={() => this.props.increment(1)}
          >
            <Text>+</Text>
          </TouchableOpacity>
          <Text>{counter}</Text>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: "yellow" }}
            onPress={() => this.props.decrement(1)}
          >
            <Text>-</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("FirstTabDetail");
          }}
        >
          <Text>跳到详情页</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  tabBarIcon: {
    width: 32,
    height: 32
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  button: {
    backgroundColor: "#ffb602",
    borderRadius: 15,
    width: 140,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});

// 这里是将store里的数据映射到Class的Props上
const mapStateToProps = state => {
  return {
    counter: state.common.counter
  };
};

// 这里是将动作绑定到store的dispatch，触发动作后会异步调用到reducer/saga那边
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchData,
      increment,
      decrement
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstTab);
