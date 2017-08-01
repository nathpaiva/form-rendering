'user strict';

import View from './View';
import { buildForm } from '../helpers/PrepareRenderInput';

class UserFormView extends View {
  constructor(elem) {
    super(elem);
  }

  prepare(model) {
    return model.map((item, i) => {
      return buildForm(item);
    }).join('');
  }

  template(model) {
    return model ?
      `<div class="forms__description">
          <img src="./public/images/phone_call.svg" alt="Cabeleireiro">          
          <h2>Estamos quase lá</h2>
          <h3>Não perca tempo ligando para vários profissionais. Preencha os dados abaixo e <strong>nós encontraremos os melhores pra você!</strong></h3>
          ${this.prepare(model)}
      </div>
      <div class="forms__action">
        <button type="button" id="button-submit" data-form="form-for-user" title="Finalizar" class="button button--primary">Finalizar</button>
      </div>
      ` : 'Não existe formulário para ser apresentar.';
  }
}

export default UserFormView;

