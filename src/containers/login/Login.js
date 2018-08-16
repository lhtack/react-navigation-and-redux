import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import React, { PureComponent } from 'react';

// import { api } from '../../network'; //这里获取了一些发送给后端的请求参数

import { setAuthToken, startVCodeCountDown, fetchData } from '../../actions';
import { height, width } from '../../constants';
import { iconDelete, iconPhoneNum, iconVcode } from '../../assets/';
const widthScale = width / 375;
const heightScale = height / 667;
class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      formatPhone: '',
      vcode: '',
      // phoneNumBackColor:'D8D8D8',
      phoneNumFocus: false,
      vcodeFocus: false,
      vcodeButtonEnable: false,
      loginButtonEnable: false,
    };
  }

  renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 90 * heightScale,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 27, color: '#333333', fontWeight: '900' }}>欢迎登录</Text>
      </View>
    );
  }

  getSendVCodeText() {
    const { vcodeCountDown } = this.props;
    if (get(vcodeCountDown, 'active')) {
      return get(vcodeCountDown, 'remaining', '发送失败');
    } else {
      return '发送验证码';
    }
  }

  validatePhone(phone) {
    return phone && phone.replace(/\s/g, '').length >= 11;
  }

  validateVcode(code) {
    return code && code.length >= 6;
  }

  onVCodePress() {
    // Keyboard.dismiss();
    const { phone } = this.state;
    const query = {}; // 这里随便输入什么东西，只是做下模拟而已
    const callback = data => {
      this.props.startVCodeCountDown();
      this.setState({
        vcodeButtonEnable: false,
      });
    };
    this.props.fetchData({
      query,
      callback,
      successTip: '请求成功，随便输入一个验证码吧',
    });
  }

  onLoginPress() {
    // 模拟存入一个token，这里本来要从后端获得的
    this.props.setAuthToken('xxxxx66688dddssd2');
  }

  lostBlur() {
    //退出软键盘
    Keyboard.dismiss();
  }

  formatPhoneNum(phones) {
    let phoneNum = phones.replace(/\s/g, '');
    //const {phone}=this.state.phone;
    //var flag=true;
    var forIndex = phoneNum.length;
    if (this.state.phone.length > phones.length) {
      if (phones.length === 4 || phones.length === 9) {
        phones = phones.substring(0, phones.length - 1);
      }

      //forIndex--;
      this.setState({
        formatPhone: phones,
        phone: phones,
        vcodeButtonEnable: this.validatePhone(phones),
      });
      return;
    }
    var formatPhone = '';
    for (let index = 0; index < forIndex; index++) {
      formatPhone += phoneNum[index];
      if (index == 2 || index == 6) {
        formatPhone += ' ';
      }
    }
    this.setState({
      formatPhone: formatPhone,
      phone: formatPhone,
      vcodeButtonEnable: this.validatePhone(phones),
    });
  }

  vcodeTextChange(vcode) {
    this.setState({
      vcode: vcode,
      loginButtonEnable: this.validateVcode(vcode),
    });
  }

  onPhoneFocus() {
    this.setState({
      phoneNumFocus: true,
    });
  }

  onPhoneBlur() {
    this.setState({
      phoneNumFocus: false,
    });
  }

  onDeletePressed() {
    this.setState({
      phone: '',
      formatPhone: '',
      vcodeButtonEnable: false,
    });
  }

  renderDeleteIcon() {
    const { phoneNumFocus, formatPhone } = this.state;
    return phoneNumFocus && formatPhone && formatPhone.length > 0 ? (
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
        onPress={() => this.onDeletePressed()}
      >
        <Image
          source={iconDelete}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    ) : null;
  }

  renderInputSession() {
    const { formatPhone, vcode, vcodeButtonEnable } = this.state;
    const { vcodeCountDown } = this.props;
    const remaining = get(vcodeCountDown, 'active');
    let enable = vcodeButtonEnable || (!remaining && this.validatePhone(formatPhone));
    return (
      <View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={iconPhoneNum} style={{ marginTop: 44 }} />
            <TextInput
              placeholder={'请输入手机号'}
              underlineColorAndroid="transparent"
              onChangeText={phone => {
                this.formatPhoneNum(phone);
              }}
              onFocus={() => this.onPhoneFocus()}
              onBlur={() => this.onPhoneBlur()}
              value={formatPhone}
              selectionColor={'#0099ff'}
              style={styles.input}
              keyboardType={'numeric'}
              maxLength={13}
            />
            {this.renderDeleteIcon()}
          </View>
          <View style={this.state.phoneNumFocus ? styles.phoneNumFocus : styles.phoneBlur} />
        </View>

        {/*<View style={{ marginVertical: 5 }}>*/}
        {/*<Text style={{ color: '#EB4A4A',marginLeft:30 }}>手机号码格式不正确</Text>*/}
        {/*</View>*/}
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={iconVcode} style={{ marginTop: 28 * heightScale }} />
            <TextInput
              onChangeText={vcode => {
                this.vcodeTextChange(vcode);
              }}
              onBlur={() => {
                this.setState({
                  vcodeFocus: false,
                });
              }}
              onFocus={() => {
                this.setState({
                  vcodeFocus: true,
                });
              }}
              value={vcode}
              placeholder={'请输入验证码'}
              underlineColorAndroid={'transparent'}
              style={[styles.input, { flex: 1, marginTop: 29 * heightScale }]}
              keyboardType={'numeric'}
              maxLength={6}
              selectionColor={'#0099ff'}
            />
            <TouchableOpacity
              style={enable ? styles.vcodeButtonEnable : styles.vcodeButtonDisable}
              disabled={!enable}
              onPress={() => {
                this.onVCodePress();
              }}
            >
              <Text style={enable ? styles.vcodeTextEable : styles.vcodeTextDisable}>{this.getSendVCodeText()}</Text>
            </TouchableOpacity>
          </View>
          <View style={this.state.vcodeFocus ? styles.vcodeFocus : styles.vcodeBlur} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 29 }}>
          <TouchableOpacity
            style={this.state.loginButtonEnable ? styles.loginButtonEable : styles.loginButtonDisable}
            onPress={() => {
              this.onLoginPress();
            }}
          >
            <Text style={this.state.loginButtonEnable ? styles.loginTextEable : styles.loginTextDisable}>登录</Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={this.lostBlur.bind(this)}>
          <View style={{ height: 120 * heightScale }}>
            <Text />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderInputSession()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25 * widthScale,
  },
  input: {
    fontSize: 16 * widthScale,
    // borderBottomWidth: 1,
    // borderBottomColor: '#FFED11',
    height: 22,
    width: 300 * widthScale,
    marginLeft: 7,
    padding: 0,
    marginTop: 40,
    // textColor:'#CCCCCC'
  },
  phoneBlur: {
    height: 1,
    width: width - 50 * widthScale,
    backgroundColor: '#CCCCCC',
    marginTop: 7,
  },
  phoneNumFocus: {
    height: 2,
    width: width - 50 * widthScale,
    backgroundColor: '#0099FF',
    marginTop: 7,
  },
  vcodeBlur: {
    height: 1,
    width: 200 * widthScale,
    backgroundColor: '#CCCCCC',
    marginTop: 0,
  },
  vcodeFocus: {
    height: 2,
    width: 200 * widthScale,
    backgroundColor: '#0099FF',
    marginTop: 0,
  },

  vcodeButtonEnable: {
    borderRadius: 2,
    // borderWidth: 1,
    width: 90 * widthScale,
    height: 32 * heightScale,
    borderColor: '#0099FF',
    borderWidth: 1,
    // width: 100,
    // backgroundColor: '#0099FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 30,
  },
  vcodeButtonDisable: {
    width: 90 * widthScale,
    height: 32 * heightScale,
    borderRadius: 2,
    borderWidth: 1,
    // width: 100,
    justifyContent: 'center',
    borderColor: '#CCCCCC',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 30,
  },
  vcodeTextDisable: {
    color: '#CCCCCC',
    // fontSize:16*widthScale,
  },
  vcodeTextEable: {
    color: '#0099FF',
    // fontSize:16*widthScale,
  },
  loginButtonEable: {
    backgroundColor: '#0099FF',
    height: 48 * heightScale,
    width: 335 * widthScale,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  loginButtonDisable: {
    backgroundColor: '#CCCCCC',
    height: 48 * heightScale,
    width: 335 * widthScale,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  loginTextEable: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginTextDisable: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    vcodeCountDown: state.common.vcodeCountDown,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setAuthToken,
      fetchData,
      startVCodeCountDown,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
