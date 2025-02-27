import debounce from 'lodash.debounce';
import { DEBOUNCE_TIME } from '../constants/constants';

const debounceInputs = debounce((callback) => {
  callback();
}, DEBOUNCE_TIME);

export default debounceInputs;
