'user strict';

import View from './View';
import { buildForm } from '../helpers/PrepareRenderInput';

class FormView extends View {
  constructor(elem) {
    super(elem);
  }

  prepare(model) {
    return model.map((item, i) => {
      return buildForm(item);
    }).join('');
  }

  template(model) {
    return model ? `
      <div class="forms__title">
        <h2 class="title title--big title--blue">Explique o que você precisa</h2>
        <small class="title title--small title--blue">Peça orçamento grátis, online!</small>
      </div>
      ${this.prepare(model)}
      <div class="forms__action">
        <button type="button" id="button-next" data-form="form-for-service" title="Buscar Profissionais" class="button button--primary">Buscar Profissionais</button>
      </div>
      ` : 'Não existe formulário para ser apresentar.';
  }
}

export default FormView;
