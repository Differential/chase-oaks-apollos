import Bugsnag from '@bugsnag/react-native';

import './loadConfig';
import { AppRegistry } from 'react-native';

Bugsnag.start();

const App = require('./src').default;

AppRegistry.registerComponent('ChaseOaks', () => App);
