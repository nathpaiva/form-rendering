import { buildForm } from '../helpers'
import { ModelType } from '../types'
import { ViewInterface } from './types'

class View implements ViewInterface {
  _elem: HTMLElement

  constructor(elem: HTMLElement) {
    this._elem = elem
  }

  fallbackMessage() {
    return 'Has no form to render.'
  }

  createForm(model: ModelType) {
    return model.map((item) => buildForm(item)).join('')
  }

  templateAction({
    buttonLabel,
    dataForm,
  }: {
    buttonLabel: string
    dataForm: 'form-for-user' | 'form-for-service'
  }) {
    return `
      <div class="forms__action">
        <button
          type="button"
          data-form="${dataForm}"
          title="${buttonLabel}"
          class="button button--primary"
        >
          ${buttonLabel}
        </button>
      </div>
    `
  }

  // TODO change this method
  template(_?: ModelType): string {
    throw new Error('This method needs to be implemented')
  }

  update(model: ModelType) {
    this._elem.innerHTML = this.template(model)
  }
}

export default View
