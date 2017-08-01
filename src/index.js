'user strict';

import FormController from './controller/FormController';
import './scss/style.scss';
const formControllerStart = new FormController();


const initialForm = {
  startCreateForm: () => {
    formControllerStart.createForm();
  }
};

initialForm.init = function () {
  initialForm.startCreateForm();
}();
