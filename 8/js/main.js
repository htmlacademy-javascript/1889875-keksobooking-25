import {initMap} from './map.js';
import {getInactiveForm, getActiveForm} from './get-page-mode.js';
import {validateForm} from './form.js';

getInactiveForm();

validateForm();

initMap(getActiveForm());
