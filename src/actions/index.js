import { createAction } from 'redux-actions';

const toggleOverlayContainer = createAction('toggleOverlayContainer');
const toggleErrorInfo = createAction('toggleErrorInfo');
const toggleLoading = createAction('toggleLoading');
const setAuthToken = createAction('setAuthToken');
const startVCodeCountDown = createAction('startVCodeCountDown'); // sagas里注册了处理函数
const setVCodeCountDown = createAction('setVCodeCountDown'); // reducers里注册了处理函数
const fetchData = createAction('fetchData'); // sagas里注册了处理函数
const increment = createAction('increment');
const decrement = createAction('decrement');

export {
  toggleOverlayContainer,
  toggleLoading,
  setAuthToken,
  toggleErrorInfo,
  fetchData,
  startVCodeCountDown,
  setVCodeCountDown,
  increment,
  decrement,
};
