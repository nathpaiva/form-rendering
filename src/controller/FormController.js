'user strict';

import RequestService from '../services/RequestService';
import FormView from '../views/FormView';
import UserFormView from '../views/UserFormView';
import ValidateForm from '../helpers/ValidateForm';

class FormController {
  constructor() {
    let $ = document.getElementById.bind(document);
    this._serviceForm = $('form-for-service');
    this._userForm = $('form-for-user');
    this._dataRequest = {};
    this._serviceFormView = new FormView(this._serviceForm);
    this._userFormView = new UserFormView(this._userForm);
  }

  sendForm(elem) {
    ValidateForm(elem);
  }

  createForm() {
    RequestService().then(data => {
      this._dataRequest = data;
      this.render();
    });
  }

  render() {
    this._serviceFormView.update(this._dataRequest.request_fields);
    this._userFormView.update(this._dataRequest.user_fields);
    let buttons = document.getElementsByTagName('button');
    const self = this;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        self.sendForm(this);
      }, false);
    }
  }
}

export default FormController;
