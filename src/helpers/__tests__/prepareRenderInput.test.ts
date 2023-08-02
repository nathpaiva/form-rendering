import { fireEvent, screen } from '@testing-library/dom'

import { RequestFields } from '../../types'
import { buildForm } from '../prepareRenderInput'

describe('prepareRenderInput', () => {
  it('should create section with checkbox input', () => {
    const fieldData = {
      reference: null,
      name: 'What will be the service?',
      label: 'What will be the service?',
      placeholder: 'What will be the service?',
      mask: 'service type',
      type: 'enumerable',
      required: true,
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

    const form = buildForm(fieldData)

    document.body.innerHTML = form
    const label = screen.getByText(fieldData.label)

    expect(label.tagName).toBe('LABEL')
    expect(label).toBeTruthy()

    const errorMessage = screen.getByText('Choose at least one option.')
    expect(errorMessage).toBeTruthy()

    Object.keys(fieldData.values).forEach((key) => {
      const keyValue = fieldData.values[key as keyof typeof fieldData.values]
      const input = screen.getByLabelText(keyValue)

      expect(input.tagName).toBe('INPUT')
      expect(input).toHaveProperty('type', 'checkbox')
      expect(input.classList.contains('required')).toBeTruthy()
      expect(input).toHaveProperty('value', keyValue)
      expect(input).not.toBeChecked()

      input.click()

      expect(input).toBeChecked()
    })
  })

  it('should create section with select', () => {
    const fieldData = {
      reference: null,
      name: 'How many people will the service be for?',
      label: 'How many people will the service be for?',
      placeholder: 'How many people will the service be for?',
      mask: 'add the number of people',
      type: 'enumerable',
      required: false,
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

    const form = buildForm(fieldData)

    document.body.innerHTML = form
    const label = screen.getByText(fieldData.label)

    expect(label.tagName).toBe('LABEL')
    expect(label).toBeTruthy()

    const select = screen.getByTestId(fieldData.name)

    expect(select.tagName).toBe('SELECT')
    expect(select).toBeTruthy()
    expect(select).toHaveValue('')

    Object.keys(fieldData.values).forEach((key, index) => {
      const keyValue = fieldData.values[key as keyof typeof fieldData.values]
      const option = screen.getByText(keyValue)

      expect(option.tagName).toBe('OPTION')

      fireEvent.change(select, { target: { value: index.toString() } })

      expect(select).toHaveValue(index.toString())
    })
  })
})
