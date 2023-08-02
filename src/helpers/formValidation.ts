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

  // if is 0 means that all fields are valid
  let countValidFields = requiredSections.length

  for (let x = 0; x < requiredSections.length; x++) {
    const requiredSection = requiredSections[x]
    const inputCollection: HTMLCollectionOf<Element> =
      requiredSection.getElementsByClassName('required')

    const containerSection =
      requiredSection.getElementsByClassName('message--error')[0]

    const setStyleToContainerSection = (hasToSetError?: boolean) => {
      const classValue = hasToSetError ? 'show' : 'hide'

      // if has no error, decrement the count
      if (!hasToSetError) countValidFields--

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
            isInputFilled = true
            setStyleToContainerSection()
          }

          if (!isInputText && !input.checked) {
            setStyleToContainerSection(true)
          }

          if (isInputText && input.value !== '') {
            isInputFilled = true
            setStyleToContainerSection()
          }

          if (isInputText && input.value === '') {
            setStyleToContainerSection(true)
          }
        } else {
          if (input.selectedIndex) {
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

    if (x + 1 === requiredSections.length && !countValidFields) {
      // get the tabs container
      const tabsArrayLike = document.querySelector('.tabs')?.children
      const hasSibling = !!formFieldset.nextElementSibling
      // check if is the last step
      const isLastStep =
        hasSibling && formFieldset.nextElementSibling.tagName === 'DIV'

      const tabsArray = tabsArrayLike ? [...tabsArrayLike] : []

      tabsArray.forEach((item) => {
        const isActive = item.classList.contains('tabs__item--active')
        // if is the last step, don't remove the active class
        if (isLastStep) {
          return
        }

        // show the the active tab
        if (isActive) {
          item.classList.remove('tabs__item--active')
        } else {
          item.classList.add('tabs__item--active')
        }
      })

      // hide the current form
      formFieldset.classList.add('forms__content--hide')

      // show the next form if is a FIELDSET
      if (
        hasSibling &&
        formFieldset.nextElementSibling.tagName === 'FIELDSET'
      ) {
        formFieldset.nextElementSibling.classList.remove('forms__content--hide')
      }

      // if is the last step, shows the success message
      if (isLastStep) {
        formFieldset.nextElementSibling.classList.remove('hide')
      }
    }
  }
}
