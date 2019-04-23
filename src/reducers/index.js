import { combineReducers } from "redux";
import { combineActions, handleActions } from "redux-actions";
import { increment, decrement } from "../actions";

const coreData = handleActions(
  {
    setAuthToken: (state, { payload }) => {
      return {
        ...state,
        authToken: payload
      };
    }
  },
  {
    authToken: "" // 默认值
  }
);

const common = handleActions(
  {
    toggleOverlayContainer: (state, { payload }) => {
      return {
        ...state,
        overlayContainer: payload
      };
    }, // 全局全屏弹窗
    toggleErrorInfo: (state, { payload }) => {
      return {
        ...state,
        errorInfo: payload
      };
    }, // 全局报错
    toggleLoading: (state, { payload }) => {
      const { visible, successTip } = payload;
      return {
        ...state,
        loading: visible,
        successTip
      };
    }, // 全局loading
    setVCodeCountDown: (state, { payload }) => {
      return {
        ...state,
        vcodeCountDown: payload
      };
    }, // 倒计时（这里是很巧妙的一个全局实现）
    // 写法1
    increment: (state, { payload: { amount } }) => {
      return {
        ...state,
        counter: state.counter + amount
      };
    },
    decrement: (state, { payload: { amount } }) => {
      return {
        ...state,
        counter: state.counter + amount
      };
    }
    // // 写法2
    // [combineActions(increment, decrement)]: (
    //   state,
    //   { payload: { amount } }
    // ) => {
    //   return { ...state, counter: state.counter + amount };
    // }
  },
  {
    overlayContainer: {
      visible: false,
      componentCreator: () => {}
    },
    errorInfo: {
      visible: false,
      text: ""
    },
    loading: false,
    successTip: "",
    vcodeCountDown: {
      active: false,
      remaining: 60
    },
    counter: 10
  }
);

const rootReducer = combineReducers({
  coreData,
  common
});

export default rootReducer;
