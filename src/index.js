/** @format */

import { AppRegistry } from 'react-native';
import Root from './Root';
import { name as appName } from '../app.json';

const register = () => {
  AppRegistry.registerComponent(appName, () => Root);
};

export default register;
