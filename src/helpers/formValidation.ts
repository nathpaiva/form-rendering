function isInputElem(
  elem: HTMLInputElement | HTMLSelectElement,
): elem is HTMLInputElement {
  return elem.tagName === 'INPUT'
}

export function formValidation(elem: HTMLElement) {
  const formReference = elem.dataset.form

  if (!formReference)
    throw new Error("This element doesn't have a form a reference.")

  const formFieldset = document.getElementById(formReference)

  if (!formFieldset) throw new Error("This container doesn't exist.")

  const requiredSections = formFieldset.getElementsByClassName('form_required')

  if (!requiredSections.length) return

  let countValid = requiredSections.length

  for (let x = 0; x < requiredSections.length; x++) {
    const requiredSection = requiredSections[x]
    const inputCollection: HTMLCollectionOf<Element> =
      requiredSection.getElementsByClassName('required')

    const containerSection =
      requiredSection.getElementsByClassName('message--error')[0]

    const setStyleToContainerSection = (hasToSetError?: boolean) => {
      const classValue = hasToSetError ? 'show' : 'hide'

      containerSection.setAttribute(
        'class',
        `message message--error ${classValue}`,
      )
    }

    if (inputCollection.length > 0) {
      let i = 0
      let isInputFilled = false

      while (i <= inputCollection.length && !isInputFilled) {
        const input = inputCollection[i] as HTMLInputElement | HTMLSelectElement

        if (isInputElem(input)) {
          const isInputText =
            input.type === 'text' ||
            input.type === 'tel' ||
            input.type === 'email'

          if (!isInputText && input.checked) {
            countValid--
            isInputFilled = true
            setStyleToContainerSection()
          }

          if (!isInputText && !input.checked) {
            setStyleToContainerSection(true)
          }

          if (isInputText && input.value !== '') {
            countValid--
            isInputFilled = true
            setStyleToContainerSection()
          }

          if (isInputText && input.value === '') {
            setStyleToContainerSection(true)
          }
        } else {
          if (input.selectedIndex) {
            countValid--
            isInputFilled = true
            setStyleToContainerSection()
          }

          if (!input.selectedIndex) {
            setStyleToContainerSection(true)
          }
        }

        if (i + 1 === inputCollection.length) {
          isInputFilled = true
        }

        i++
      }
    }

    if (x + 1 === requiredSections.length && !countValid) {
      if (formReference === 'form-for-service') {
        formFieldset.classList.add('forms__content--hide')
        ;(formFieldset.nextSibling?.nextSibling as any)?.classList.remove(
          'forms__content--hide',
        )
      } else {
        ;(formFieldset.nextSibling?.nextSibling as any)?.classList.remove(
          'hide',
        )
        formFieldset.classList.add('forms__content--hide')
      }

      if (formReference !== 'form-for-service' || !document) return

      const tabsItem: any = document.querySelector('.tabs')?.children

      for (let i = 0; i < tabsItem.length; i++) {
        if (tabsItem[i].classList.contains('tabs__item--active')) {
          tabsItem[i].classList.remove('tabs__item--active')
        } else {
          tabsItem[i].classList.add('tabs__item--active')
        }
      }
    }
  }
}
