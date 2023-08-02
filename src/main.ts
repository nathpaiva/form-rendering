import { FormController } from './controller'
import './scss/style.scss'

interface InitialFormInterface {
  startCreateForm: () => void
}

const initialForm: InitialFormInterface = {
  startCreateForm: () => {
    const formControllerStart = new FormController()

    formControllerStart.createForm()
  },
}

window.addEventListener('DOMContentLoaded', () => {
  initialForm.startCreateForm()
})
