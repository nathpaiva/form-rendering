import { ModelType } from '../types'
import View from './View'

export class UserFormView extends View {
  constructor(elem: HTMLElement) {
    super(elem)
  }

  template(model?: ModelType) {
    if (!model) return this.fallbackMessage()

    return `
      <div class="forms__description">
        <img src="./images/phone_call.svg" alt="Cabeleireiro" />

        <h2>Estamos quase lá</h2>
        <h3>
          Não perca tempo ligando para vários profissionais. Preencha os dados abaixo e <strong>nós encontraremos os melhores pra você!</strong>
        </h3>

        ${this.createForm(model)}
      </div>

      ${this.templateAction({
        buttonLabel: 'Finalizar',
        dataForm: 'form-for-user',
      })}
    `
  }
}
