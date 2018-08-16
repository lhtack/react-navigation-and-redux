import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using
import rootReducers from '../reducers';
import sagas from '../sagas';

const config = {
  key: 'primary',
  storage,
  whitelist: ['coreData'], // 白名单的意思是reducer中的coreData数据要持久化
};
const reducer = persistReducer(config, rootReducers);
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const callback = () => {
    console.log('恢复数据成功');
  };
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(sagas);
  persistStore(store, null, callback);

  return store;
}
