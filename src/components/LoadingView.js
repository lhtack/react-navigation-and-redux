import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { animationLoading, animationSuccess } from '../assets/animation';

export default class Loading extends Component {
  static defaultProps = {
    visible: true,
    text: '正在加载..',
  };

  componentDidMount() {
    this.animation.play();
  }

  componentWillUnmount() {
    this.animation && this.animation.reset();
    this.animation = null;
  }

  render() {
    return this.props.visible ? (
      <View style={styles.container}>
        <LottieView
          style={{}}
          ref={animation => {
            this.animation = animation;
          }}
          source={animationLoading}
        />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    color: '#ffffff',
  },
});
