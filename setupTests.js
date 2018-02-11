import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('react-native-mock/mock');

configure({ adapter: new Adapter() });