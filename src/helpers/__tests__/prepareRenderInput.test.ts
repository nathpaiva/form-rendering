import { fireEvent, screen } from '@testing-library/dom'

import { RequestFields, UserFields } from '../../types'
import { buildForm } from '../prepareRenderInput'

const expectsCheckbox = (form: string, props: RequestFields) => {
  document.body.innerHTML = form
  const label = screen.getByText(props.label)

  expect(label.tagName).toBe('LABEL')
  expect(label).toBeTruthy()

  if (props.required) {
    const errorMessage = screen.getByText('Choose at least one option.')
    expect(errorMessage).toBeTruthy()
  }

  Object.keys(props.values).forEach((key) => {
    const keyValue = props.values[key as keyof typeof props.values]
    const input = screen.getByLabelText(keyValue)

    expect(input.tagName).toBe('INPUT')
    expect(input).toHaveProperty('type', 'checkbox')
    if (props.required) {
      expect(input.classList.contains('required')).toBeTruthy()
    } else {
      expect(input.classList.contains('required')).toBeFalsy()
    }
    expect(input).toHaveProperty('value', keyValue)
    expect(input).not.toBeChecked()

    input.click()

    expect(input).toBeChecked()
  })
}

const expectsSelect = (form: string, props: RequestFields) => {
  document.body.innerHTML = form
  const label = screen.getByText(props.label)

  expect(label.tagName).toBe('LABEL')
  expect(label).toBeTruthy()

  const select = screen.getByTestId(props.name)

  expect(select.tagName).toBe('SELECT')
  expect(select).toBeTruthy()
  expect(select).toHaveValue('')
  if (props.required) {
    expect(select.classList.contains('required')).toBeTruthy()
  } else {
    expect(select.classList.contains('required')).toBeFalsy()
  }

  Object.keys(props.values).forEach((key, index) => {
    const keyValue = props.values[key as keyof typeof props.values]
    const option = screen.getByText(keyValue)

    expect(option.tagName).toBe('OPTION')

    fireEvent.change(select, { target: { value: index.toString() } })

    expect(select).toHaveValue(index.toString())
  })
}

describe('prepareRenderInput', () => {
  describe('checkbox', () => {
    const checkboxFieldData = (isRequired = true): RequestFields => {
      const data = {
        reference: null,
        name: 'What will be the service?',
        label: 'What will be the service?',
        placeholder: 'What will be the service?',
        mask: 'service type',
        type: 'enumerable',
        required: isRequired,
        allow_multiple_value: true,
        allow_custom_value: false,
        values: {
          Dye: 'Dye',
          Haircut: 'Haircut',
        },
        _embedded: {
          nested_fields: [],
        },
      } satisfies RequestFields

      return data
    }

    it('should create required section with checkbox input', () => {
      const props = checkboxFieldData()
      const form = buildForm(props)

      expectsCheckbox(form, props)
    })

    it('should create not required section with checkbox input', () => {
      const props = checkboxFieldData(false)
      const form = buildForm(props)

      expectsCheckbox(form, props)
    })
  })

  describe('select', () => {
    const selectFieldData = (isRequired = true): RequestFields => {
      const data = {
        reference: null,
        name: 'How many people will the service be for?',
        label: 'How many people will the service be for?',
        placeholder: 'How many people will the service be for?',
        mask: 'add the number of people',
        type: 'enumerable',
        required: isRequired,
        allow_multiple_value: false,
        allow_custom_value: false,
        values: {
          '1': '1',
          '2': '2',
          'More than 3': 'More than 3',
        },
        _embedded: {
          nested_fields: [],
        },
      } satisfies RequestFields

      return data
    }

    it('should create required section with select', () => {
      const props = selectFieldData()

      const form = buildForm(props)

      expectsSelect(form, props)
    })

    it('should create not required section with select', () => {
      const props = selectFieldData(false)

      const form = buildForm(props)

      expectsSelect(form, props)
    })
  })

  it('should create section with textarea', () => {
    const fieldData = {
      name: 'Additional Information',
      label: 'Additional Information',
      type: 'big_text',
      placeholder: 'Describe what you need',
      required: false,
    } satisfies UserFields

    const form = buildForm(fieldData)

    document.body.innerHTML = form
    const label = screen.getByText(fieldData.label)

    expect(label.tagName).toBe('LABEL')
    expect(label).toBeTruthy()

    const textarea = screen.getByPlaceholderText(fieldData.placeholder)

    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toHaveValue('')

    const textToType = 'my information'
    fireEvent.change(textarea, { target: { value: textToType } })
    expect(textarea).toHaveValue(textToType)
  })

  it('should create section with input text', () => {
    const fieldData = {
      name: 'name',
      label: 'Nome',
      type: 'small_text',
      placeholder: '',
      required: true,
    } satisfies UserFields

    const form = buildForm(fieldData)

    document.body.innerHTML = form
    const label = screen.getByText(fieldData.label)

    expect(label.tagName).toBe('LABEL')
    expect(label).toBeTruthy()

    const textarea = screen.getByPlaceholderText(fieldData.placeholder)

    expect(textarea.tagName).toBe('INPUT')
    expect(textarea).toHaveValue('')

    const textToType = 'my information'
    fireEvent.change(textarea, { target: { value: textToType } })
    expect(textarea).toHaveValue(textToType)
  })
})
