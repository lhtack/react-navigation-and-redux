import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { PureComponent } from 'react';
import { LoadingView,LoadingSuccess } from '../../components';
import { toggleLoading } from '../../actions/index';

class Loading extends PureComponent {
  render() {
    const { loading, successTip } = this.props;
    if (loading) {
      return (
        <View style={styles.container}>
          <LoadingView />
        </View>
      );
    } else if (successTip && successTip.length > 0) {
      this.startTimer();
      return (
        <View style={styles.container}>
          <LoadingSuccess text={successTip} />
        </View>);
    } else {
      return null;
    }
  }

  startTimer = () => {
    setTimeout(() => {
      this.props.toggleLoading({
        visible: false,
        successTip: '',
      });
    }, 2 * 1000);
  };

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#000000b3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleLoading,
    },
    dispatch,
  );
};

const mapStateToProps = state => ({
  loading: state.common.loading,
  successTip:state.common.successTip,
});
export default connect(mapStateToProps, mapDispatchToProps)(Loading);
