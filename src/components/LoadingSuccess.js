import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  animationSuccess,

} from '../assets/animation';

export default class LoadingSuccess extends Component {

  static defaultProps = {
    visible: true,
    text: '操作成功',
  };

  componentDidMount() {
    this.animation.play();
  }

  componentWillUnmount() {
    this.animation && this.animation.reset();
    this.animation = null;
  }

  render() {
    const { text } = this.props;
    return (
      <View
        style={styles.container}
      >
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          source={animationSuccess}
        />
        <Text style={styles.descriptionText}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    marginTop: 50,
    color: '#ffffff',
  },

});
