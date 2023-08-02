import { formValidation } from '../helpers'
import { requestService } from '../services'
import { DataResponse } from '../types'
import { FormView, UserFormView, type ViewInterface } from '../views'

interface IFormController {
  _serviceForm: HTMLElement | null
  _userForm: HTMLElement | null
  _dataRequest: DataResponse
  _serviceFormView: ViewInterface | null
  _userFormView: ViewInterface | null
  submitForm: (elem: HTMLElement) => void
  createForm: () => void
  render: () => void
}

export class FormController implements IFormController {
  _serviceForm: HTMLElement | null
  _userForm: HTMLElement | null
  _dataRequest: DataResponse
  _serviceFormView: ViewInterface | null
  _userFormView: ViewInterface | null

  constructor() {
    // create a reference to get the elements
    const $ = document.getElementById.bind(document)

    // get the elements
    this._serviceForm = $('form-for-service')
    this._userForm = $('form-for-user')

    // create a reference to get the data
    this._dataRequest = null

    // create a reference to get the views
    this._serviceFormView = this._serviceForm
      ? new FormView(this._serviceForm)
      : null
    this._userFormView = this._userForm
      ? new UserFormView(this._userForm)
      : null
  }

  submitForm(elem: HTMLElement) {
    formValidation(elem)
  }

  async createForm() {
    const data = await requestService()

    this._dataRequest = data
    this.render()
  }

  render() {
    // TODO: add function to handle with errors
    if (!this._dataRequest || !this._serviceFormView || !this._userFormView)
      return

    this._serviceFormView.update(this._dataRequest.request_fields)

    this._userFormView.update(this._dataRequest.user_fields)
    ;(function (self) {
      const buttons = document.getElementsByTagName('button')

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener(
          'click',
          function () {
            self.submitForm(this)
          },
          false,
        )
      }
    })(this)
  }
}
