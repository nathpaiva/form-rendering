import { RequestFields, UserFields } from '../types'

export function buildForm(item: RequestFields | UserFields) {
  if (item.type === 'enumerable' && item.allow_multiple_value) {
    return inputCheckBox(item)
  } else if (item.type === 'enumerable' && !item.allow_multiple_value) {
    return selectField(item)
  } else {
    return inputText(item)
  }
}

function _prepareInput(item: RequestFields | UserFields) {
  if (item.type === 'big_text') {
    return `<textarea type="textarea" name="${item.label}" placeholder="${
      item.placeholder
    }" ${item.required === true ? 'class="required"' : ''}/></textarea>`
  } else if (item.type === 'small_text' || item.type === 'lat_lng') {
    return `<input type="text" name="${item.name}" id="${
      item.name
    }" placeholder="${item.placeholder}" ${
      item.required === true ? 'class="required"' : ''
    }/>`
  } else {
    return `<input type="${item.type}" name="${item.name}" id="${
      item.name
    }" placeholder="${item.placeholder}" ${
      item.required === true ? 'class="required"' : ''
    }/>`
  }
}

export function inputCheckBox(item: RequestFields) {
  return `<div class="forms__fields ${item.required ? 'form_required' : ''}">
        <label>${item.label}</label>
        <ul class="forms__inputs">
          ${Object.keys(item.values)
            .map(
              (objectKey, index) => `
              <li class="forms__check">
                  <input type="checkbox" ${
                    item.required ? 'class="required"' : ''
                  } name="${item.label}" id="${item.label}-${index}" value="${
                    item.values[objectKey]
                  }" />
                  <label for="${item.label}-${index}">${
                    item.values[objectKey]
                  }</label>
              </li>
          `,
            )
            .join('')}
        </ul>
        ${
          item.required
            ? '<span class="message message--error">Escolha ao menos uma opção.</span>'
            : ''
        }
      </div>`
}

export function selectField(item: RequestFields) {
  return `
    <div class="forms__fields ${item.required ? 'form_required' : ''}">
        <label for="O serviço será para quantas pessoas?">${item.label}</label>
        <select id="O serviço será para quantas pessoas?" name="O serviço será para quantas pessoas?" class="forms__select ${
          item.required ? 'required ' : ''
        }">
            <option value="">${item.mask}</option>
            ${Object.keys(item.values)
              .map(
                (objectKey, index) =>
                  `<option value="${index}">${item.values[objectKey]}</option>`,
              )
              .join('')}
        </select>
        ${
          item.required
            ? '<span class="message message--error">Selecione uma opção.</span>'
            : ''
        }
    </div>
  `
}

export function inputText(item: RequestFields | UserFields) {
  return `
    <div class="forms__fields ${item.required ? 'form_required' : ''}">
      <label for="${item.name}">${item.label}</label>
      ${_prepareInput(item)}
      ${
        item.required
          ? '<span class="message message--error">Este campo é requerido</span>'
          : ''
      }
    </div>
  `
}
