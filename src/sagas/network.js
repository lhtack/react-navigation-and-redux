/////// 注意这个文件是基于graphql接口的实现

// import AppEnvironment from 'react-native-config'; // 这里可以切换环境变量
import { call, race, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { get, forEach, map } from 'lodash';
import urljoin from 'url-join'; // 用于拼接相对路径

import { toggleErrorInfo, toggleLoading, setAuthToken } from '../actions';
// 以前的逻辑时，登录时获得token然后持久化保存token，下次使用就不用重新登录了
/* 这里都注释了吧，反正看看就完了
const encodeURLBody = params => {
  const keys = Object.keys(params);
  const encodedParams = map(keys, key => `${key}=${params[key]}`).join('&');
  return encodedParams;
};

// 原来项目中使用的函数
function* fetchGraphqlDataSaga({ payload }) {
  let url = AppEnvironment.OFO_API_SERVER;
  const { query, callback, errCallback, header, variables, showError = true, showLoading = true, successTip } = payload;

  showLoading && (yield put(toggleLoading({ visible: true })));

  const requestHeader = {};
  if (header) {
    const keys = Object.getOwnPropertyNames(header);
    forEach(keys, key => {
      let val = header[key];
      if (val instanceof Object) {
        val = JSON.stringify(val);
      }
      requestHeader[key] = val;
    });
  }

  let errorMsg = '';
  let errorCode = -1;

  const state = yield select();
  const networkInfo = get(state, ['common', 'networkInfo']);
  const isConnected = get(networkInfo, 'type', 'none') !== 'none';
  if (!isConnected) {
    errorMsg = '无网络，请检查网络状态';
    errorCode = -1;

    showLoading && (yield put(toggleLoading({ visible: false })));
    showError && (yield put(toggleErrorInfo({ visible: true, text: errorMsg })));

    const errors = [
      {
        code: errorCode,
        message: errorMsg,
      },
    ];
    errCallback && errCallback(errors);
    return;
  }

  const authToken = get(state, ['coreData', 'authToken']);
  let commonParams = undefined;

  if (authToken) {
    commonParams = {};
    commonParams.token = authToken;
  }

  if (commonParams) {
    const paramsStr = `?${encodeURLBody(commonParams)}`;
    url = url.concat(paramsStr);
  }

  const requestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //...headers,
    },
    body: JSON.stringify({ query, variables }),
  };

  const result = yield race({
    io: call(fetch, url, requestInit),
    timeout: call(delay, 15 * 1000),
  });

  if (result.timeout) {
    errorMsg = '请求超时（15秒)';
    errorCode = -1;

    showLoading && (yield put(toggleLoading({ visible: false })));
    showError && (yield put(toggleErrorInfo({ visible: true, text: errorMsg })));
    const errors = [
      {
        code: errorCode,
        message: errorMsg,
      },
    ];
    errCallback && errCallback(errors);
    return;
  }

  const responseBody = get(result, ['io', '_bodyInit']);
  try {
    const parseBody = JSON.parse(responseBody);
    const errors = get(parseBody, 'errors');

    if (errors) {
      errorMsg = get(errors, ['0', 'message'], '');
      errorCode = get(errors, ['0', 'code']);

      showLoading && (yield put(toggleLoading({ visible: false })));
      showError && (yield put(toggleErrorInfo({ visible: true, text: errorMsg })));

      if (errorCode === 40038 || errorCode === 40039) {
        // 40038 token过期，退出登录
        // 40039 无效Token
        yield put(setAuthToken(undefined));
        yield put(setUserInfo(undefined));
      } else {
        errCallback && errCallback(errors);
      }
    } else {
      const data = get(parseBody, 'data', {});

      showLoading && (yield put(toggleLoading({ visible: false, successTip: successTip })));
      callback && callback(data);
    }
  } catch (e) {
    errorMsg = '未知错误';
    errorCode = -1;

    const errors = [
      {
        code: errorCode,
        message: errorMsg,
      },
    ];

    showLoading && (yield put(toggleLoading({ visible: false })));
    showError && (yield put(toggleErrorInfo({ visible: true, text: errorMsg })));

    errCallback && errCallback(errors);
  }
}
*/

function* fetchGraphqlDataSaga({ payload }) {
  let url = 'https://www.baidu.com';
  const { query, callback, errCallback, header, variables, showError = true, showLoading = true, successTip } = payload;

  showLoading && (yield put(toggleLoading({ visible: true })));

  const requestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //...headers,
    },
  };

  const result = yield race({
    io: call(fetch, url, requestInit),
    timeout: call(delay, 15 * 1000),
  });

  if (result.timeout) {
    errorMsg = '请求超时（15秒)';
    errorCode = -1;

    showLoading && (yield put(toggleLoading({ visible: false })));
    showError && (yield put(toggleErrorInfo({ visible: true, text: errorMsg })));
    const errors = [
      {
        code: errorCode,
        message: errorMsg,
      },
    ];
    errCallback && errCallback(errors);
    return;
  }

  const responseBody = get(result, ['io', '_bodyInit']);
  showLoading && (yield put(toggleLoading({ visible: false, successTip: successTip })));
  callback && callback(responseBody);
}

export { fetchGraphqlDataSaga };
