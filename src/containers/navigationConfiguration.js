import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { iconWorkCenter, iconDataCenter } from '../assets/';
import { heightScale, widthScale } from '../constants';

import FirstTab from './firstTab';
import SecondTab from './secondTab';
import FirstTabDetail from './firstTabDetail';
import Logout from './logout';

const darkTheme = {
  tabActiveIconTint: '#0099FF',
  tabInactiveIconTint: '#979797',
  activeBackground: '#ffffff',
  inactiveBackground: '#ffffff',
  tabBarBackground: '#ffffff',
  tabBarOutline: '#E6E6E6',
};

const firstStackNav = createStackNavigator({
  FirstTab: {
    screen: FirstTab,
    navigationOptions: {
      swipeEnabled: true, // 支持滑动切换Tab页
    }, // 这里的navigationOptions和FirstTab.js文件里类的navigationOptions是一个
  },
  FirstTabDetail: {
    screen: FirstTabDetail,
    navigationOptions: {
      gesturesEnabled: false, // 禁用滑动手势
      title: '详情',
    },
  },
});

const secondStackNav = createStackNavigator({
  SecondTab: {
    screen: SecondTab,
    navigationOptions: {
      swipeEnabled: true, // 支持滑动切换Tab页
      header: null,
    },
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      gesturesEnabled: false, // 禁用滑动手势
      title: '设置',
    },
  },
});

const routeConfiguration = {
  first: {
    screen: firstStackNav,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];

      return {
        tabBarIcon: ({ focused, tintColor }) => {
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return (
            <Image
              source={iconWorkCenter}
              style={{
                width: 32,
                height: 32,
                tintColor: tintColor,
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarVisible: routeName === 'FirstTab',
        tabBarLabel: '页面1',
      };
    },
  },
  second: {
    screen: secondStackNav,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];

      return {
        tabBarIcon: ({ focused, tintColor }) => {
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return (
            <Image
              source={iconDataCenter}
              style={{
                width: 32,
                height: 32,
                tintColor: tintColor,
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarVisible: routeName === 'SecondTab',
        tabBarLabel: '页面2',
      };
    },
  },
};

const tabBarConfiguration = {
  //这里设置的是一般情况下Tabbar共同的属性
  swipeEnabled: false, // 是否允许在标签之间进行滑动。
  animationEnabled: false, // 是否在更改标签时显示动画。
  lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
  initialRouteName: '', // 设置默认的页面组件
  backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  tabBarOptions: {
    activeTintColor: darkTheme.tabActiveIconTint,
    inactiveTintColor: darkTheme.tabInactiveIconTint,
    activeBackgroundColor: darkTheme.activeBackground,
    inactiveBackgroundColor: darkTheme.inactiveBackground,
    labelStyle: {
      fontSize: 10,
      color: '#787878',
    }, //label的样式。
    indicatorStyle: {
      height: null,
      backgroundColor: 'transparent',
    },
    showIcon: true,
    style: {
      borderWidth: 0,
      height: 54 * heightScale,
      backgroundColor: darkTheme.tabBarBackground,
      shadowColor: '#000000',
      shadowOpacity: 0.03,
      elevation: 30,
    },
  },
};

export const TabBar = createBottomTabNavigator(routeConfiguration, tabBarConfiguration);
