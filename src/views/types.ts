import { ModelType } from '../types'

export interface ViewInterface {
  _elem: HTMLElement
  createForm: (model: ModelType) => string
  template: (model?: ModelType) => string
  update: (model: ModelType) => void
  fallbackMessage: () => void
  templateAction: (params: {
    buttonLabel: string
    dataForm: 'form-for-user' | 'form-for-service'
  }) => string
}
