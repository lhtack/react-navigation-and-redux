import { createAction, createActions } from "redux-actions";

const toggleOverlayContainer = createAction("toggleOverlayContainer");
const toggleErrorInfo = createAction("toggleErrorInfo");
const toggleLoading = createAction("toggleLoading");
const setAuthToken = createAction("setAuthToken");
const startVCodeCountDown = createAction("startVCodeCountDown"); // sagas里注册了处理函数
const setVCodeCountDown = createAction("setVCodeCountDown"); // reducers里注册了处理函数
const fetchData = createAction("fetchData"); // sagas里注册了处理函数

// 写法1
// const increment = createAction("increment", (amount = 1) => ({
//   amount
// }));
// const decrement = createAction("decrement", (amount = 1) => ({
//   amount: -amount
// }));

// 写法2
const { increment, decrement } = createActions({
  increment: (amount = 1) => ({
    amount
  }),
  decrement: (amount = 1) => ({
    amount: -amount
  })
});

export {
  toggleOverlayContainer,
  toggleLoading,
  setAuthToken,
  toggleErrorInfo,
  fetchData,
  startVCodeCountDown,
  setVCodeCountDown,
  increment,
  decrement
};
