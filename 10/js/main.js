import { initMap } from './map.js';
import { getInactiveForm } from './get-page-mode.js';
import { validateForm } from './form.js';
import { setFormSubmit } from './submit-form.js';

getInactiveForm();

validateForm();

initMap();

setFormSubmit();
