'user strict';

class View {
  constructor(elem = '') {
    this._elem = elem;
  }

  template(model) {
    throw new Error('O método template deve ser implementado');
  }

  update(model) {
    this._elem.innerHTML = this.template(model);
  }
}

export default View;
