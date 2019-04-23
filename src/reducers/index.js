import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

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
    increment: (state, { payload: { amount = 1 } = { amount: 1 } }) => {
      return {
        ...state,
        counter: state.counter + amount
      };
    }, // 这里赋默认值 ES6的语法，如果payload为undefined,那么payload默认值为{ amount: 1 }。payload不为undefined，amount为undefined，那么amount默认值为1
    decrement: (state, { payload: { amount = 1 } = { amount: 1 } }) => {
      return {
        ...state,
        counter: state.counter - amount
      };
    }
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
    counter: 0
  }
);

const rootReducer = combineReducers({
  coreData,
  common
});

export default rootReducer;
