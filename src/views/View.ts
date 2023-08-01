import { buildForm } from '../helpers/PrepareRenderInput'
import { ModelType } from '../types'

export interface ViewInterface {
  _elem: HTMLElement
  prepare: (model: ModelType) => string
  template: (model?: ModelType) => string
  update: (model: ModelType) => void
}

class View implements ViewInterface {
  _elem: HTMLElement

  constructor(elem: HTMLElement) {
    this._elem = elem
  }

  prepare(model: ModelType) {
    return model.map((item) => buildForm(item)).join('')
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
