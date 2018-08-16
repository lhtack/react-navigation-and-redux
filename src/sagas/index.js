import { delay } from 'redux-saga';
import { get } from 'lodash'; // 这个东东很牛，可以用来处理数据
import { put, takeEvery, select } from 'redux-saga/effects';
import { fetchGraphqlDataSaga } from './network';
import { toggleErrorInfo, fetchData, startVCodeCountDown, setVCodeCountDown } from '../actions';

function* toggleErrorInfoSaga({ payload }) {
  const { visible } = payload;
  if (visible) {
    yield delay(3000);
    yield put(toggleErrorInfo({ visible: false }));
  }
}

function* startVCodeCountDownSaga() {
  const state = yield select();
  const active = get(state, ['common', 'vcodeCountDown', 'active'], true);
  const remaining = get(state, ['common', 'vcodeCountDown', 'remaining'], 0);

  if (active) return;

  for (let i = remaining; i > 0; i--) {
    yield put(
      setVCodeCountDown({
        active: true,
        remaining: i,
      })
    );
    yield delay(1000);
  }
  yield put(
    setVCodeCountDown({
      active: false,
      remaining,
    })
  );
}
function* startRingCountDownSaga() {
  const state = yield select();
  const active = get(state, ['common', 'ringCountDown', 'active'], true);
  const remaining = get(state, ['common', 'ringCountDown', 'remaining'], 0);

  if (active) return;

  for (let i = remaining; i > 0; i--) {
    yield put(
      setRingCountDown({
        active: true,
        remaining: i,
      })
    );
    yield delay(1000);
  }
  yield put(
    setRingCountDown({
      active: false,
      remaining,
    })
  );
}

export default function*() {
  yield takeEvery(toggleErrorInfo.toString(), toggleErrorInfoSaga);
  yield takeEvery(fetchData.toString(), fetchGraphqlDataSaga);
  yield takeEvery(startVCodeCountDown.toString(), startVCodeCountDownSaga);
}
