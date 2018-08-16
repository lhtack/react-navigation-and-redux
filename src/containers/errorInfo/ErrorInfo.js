import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { PureComponent } from 'react';

class ErrorInfo extends PureComponent {
  render() {
    const { text, visible } = this.props.errorInfo;
    const animateStyle = {
      opacity: visible === true ? 1 : 0,
    };
    return (
      <View style={styles.info} pointerEvents="box-none">
        <Animatable.Text
          duration={300}
          transition={['opacity']}
          style={[styles.text, animateStyle]}
        >
          {text}
        </Animatable.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

const mapStateToProps = state => ({
  errorInfo: state.common.errorInfo,
});
export default connect(mapStateToProps, null)(ErrorInfo);
