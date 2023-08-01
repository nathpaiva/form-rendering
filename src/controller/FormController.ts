import ValidateForm from '../helpers/ValidateForm'
import RequestService from '../services/RequestService'
import { DataResponse } from '../types'
import FormView from '../views/FormView'
import UserFormView from '../views/UserFormView'
import { ViewInterface } from '../views/View'

export class FormController {
  _serviceForm: HTMLElement | null
  _userForm: HTMLElement | null
  _dataRequest: DataResponse
  _serviceFormView: null | ViewInterface
  _userFormView: null | ViewInterface

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
    ValidateForm(elem)
  }

  async createForm() {
    const data = await RequestService()

    this._dataRequest = data
    this.render()
  }

  render() {
    // TODO: add function to handle with errors
    if (!this._dataRequest || !this._serviceFormView || !this._userFormView)
      return

    this._serviceFormView.update(this._dataRequest.request_fields)
    this._userFormView.update(this._dataRequest.user_fields)

    const buttons = document.getElementsByTagName('button')
    const self = this
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener(
        'click',
        function () {
          self.submitForm(this)
        },
        false,
      )
    }
  }
}
