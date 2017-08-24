'user strict';

import { buildForm } from '../helpers/PrepareRenderInput';

class View {
  constructor(elem = '') {
    this._elem = elem;
  }

  prepare(model) {
    return model.map((item, i) => {
      return buildForm(item);
    }).join('');
  }

  template(model) {
    throw new Error('O método template deve ser implementado');
  }

  update(model) {
    this._elem.innerHTML = this.template(model);
  }
}

export default View;
