import React, { PureComponent } from 'react';
import { StyleSheet, View, BackHandler, LayoutAnimation, Platform, UIManager, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { height, width } from '../../constants';
import { toggleOverlayContainer } from '../../actions';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

let CustomLayoutAnimation = {
  duration: 80,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    springDamping: 0.8,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};

class OverlayContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.onBackPressed = this.onBackPressed.bind(this);
    this.state = {
      top: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight,
    };
  }
  componentWillMount() {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
  }

  componentWillUpdate(nextProps) {
    const visible = get(nextProps, ['overlayContainer', 'visible']);
    this.startAnimation(visible);
  }

  render() {
    const { overlayContainer, toggleOverlayContainer } = this.props;
    const { visible, componentCreator, color } = overlayContainer;
    const onCloseHandler = () => toggleOverlayContainer({ visible: false });
    const children = componentCreator && componentCreator(onCloseHandler);

    if (!visible) {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
      return null;
    } else {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
      return (
        <View style={[styles.container, { backgroundColor: color || 'rgba(0, 0, 0, 0.6)' }]}>
          <View style={[styles.content, { top: this.state.top }]}>{children}</View>
        </View>
      );
    }
  }

  startAnimation = visible => {
    setTimeout(() => {
      this.setState({
        top: visible ? 0 : height,
      });
    }, 100);
  };

  onBackPressed() {
    const { toggleOverlayContainer } = this.props;
    toggleOverlayContainer({ visible: false });
    return true;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: Platform.OS === 'ios' ? 2 * height : 2 * height - StatusBar.currentHeight,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  overlayContainer: state.common.overlayContainer,
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleOverlayContainer,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlayContainer);
