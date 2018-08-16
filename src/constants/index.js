import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const widthScale = width / 375;
const heightScale = height / 667;

export { width, height, widthScale, heightScale };
