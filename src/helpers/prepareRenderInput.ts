import { RequestFields, UserFields } from '../types'

type TPrepareInputText =
  | Pick<RequestFields, 'type' | 'label' | 'name' | 'placeholder' | 'required'>
  | Pick<UserFields, 'type' | 'label' | 'name' | 'placeholder' | 'required'>

function _prepareInputText({
  type,
  label,
  name,
  placeholder,
  required,
}: TPrepareInputText) {
  const inputClassName = required ? 'class="required"' : ''
  const inputType = type === 'lat_lng' || type === 'small_text' ? 'text' : type

  // if is a big text, return a textarea
  if (inputType === 'big_text') {
    return `<textarea type="textarea" name="${label}" placeholder="${placeholder}" ${inputClassName}/></textarea>`
  }

  return `<input type="${inputType}" name="${name}" id="${name}" placeholder="${placeholder}" ${inputClassName}/>`
}

type TErrorMessage = {
  message: string
  required: boolean
}

function _errorMessage({ message, required }: TErrorMessage): string {
  return required
    ? `<span class="message message--error">${message}</span>`
    : ''
}

export function inputText({
  required,
  name,
  label,
  placeholder,
  type,
}: RequestFields | UserFields) {
  const formFieldsClassName = required ? 'form_required' : ''

  return `
    <div class="forms__fields ${formFieldsClassName}">
      <label for="${name}">${label}</label>

      ${_prepareInputText({
        required,
        name,
        label,
        placeholder,
        type,
      })}

      ${_errorMessage({ message: 'This fields is required.', required })}
    </div>
  `
}

export function inputCheckBox({ values, label, required }: RequestFields) {
  const formFieldsClassName = required ? 'form_required' : ''

  return `
    <div class="forms__fields ${formFieldsClassName}">
      <label>${label}</label>

      <ul class="forms__inputs">
        ${Object.keys(values)
          .map((key, index) => {
            const inputClassName = required ? 'class="required"' : ''
            const inputReference = `${label}-${index}`

            return `
              <li class="forms__check">
                  <input
                    type="checkbox"
                    name="${label}"
                    id="${inputReference}"
                    ${inputClassName}
                    value="${values[key]}"
                  />
                  <label for="${inputReference}">${values[key]}</label>
              </li>
            `
          })
          .join('')}
      </ul>

      ${_errorMessage({ message: 'Choose at least one option.', required })}
    </div>
  `
}

export function selectField({ required, label, values, mask }: RequestFields) {
  const formFieldsClassName = required ? 'form_required' : ''
  const selectClassName = required ? 'required' : ''

  return `
    <div class="forms__fields ${formFieldsClassName}">
      <label for="${label}">${label}</label>

      <select
        id="${label}"
        name="${label}"
        class="forms__select ${selectClassName}"
        data-testid="${label}"
      >
          <option value="">${mask}</option>

          ${Object.keys(values)
            .map(
              (key, index) =>
                `<option value="${index}">${values[key]}</option>`,
            )
            .join('')}
      </select>
      ${_errorMessage({ message: 'Select one option.', required })}
    </div>
  `
}

export function buildForm(item: RequestFields | UserFields) {
  const isEnumerable = item.type === 'enumerable'

  if (isEnumerable && item.allow_multiple_value) {
    return inputCheckBox(item)
  }

  if (isEnumerable && !item.allow_multiple_value) {
    return selectField(item)
  }

  return inputText(item)
}
