import { ModelType } from '../types'
import View from './View'

class FormView extends View {
  constructor(elem: HTMLElement) {
    super(elem)
  }

  template(model?: ModelType) {
    if (!model) return 'Não existe formulário para ser apresentar.'

    return `
      <div class="forms__title">
        <h2 class="title title--big title--blue">Explique o que você precisa</h2>
        <small class="title title--small title--blue">Peça orçamento grátis, online!</small>
      </div>
      ${this.prepare(model)}
      <div class="forms__action">
        <button type="button" id="button-next" data-form="form-for-service" title="Buscar Profissionais" class="button button--primary">Buscar Profissionais</button>
      </div>
      `
  }
}

export default FormView
