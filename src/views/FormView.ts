import { ModelType } from '../types'
import View from './View'

export class FormView extends View {
  constructor(elem: HTMLElement) {
    super(elem)
  }

  template(model?: ModelType) {
    if (!model) return this.fallbackMessage()

    return `
      <div class="forms__title">
        <h2 class="title title--big title--blue">Explique o que você precisa</h2>
        <small class="title title--small title--blue">Peça orçamento grátis, online!</small>
      </div>

      ${this.createForm(model)}

      ${this.buildAction({
        buttonLabel: 'Buscar Profissionais',
        dataForm: 'form-for-service',
      })}
    `
  }
}
