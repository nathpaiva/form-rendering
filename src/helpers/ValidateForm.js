'use strict';

function validationForm(elem) {
  const formId = elem.dataset.form;
  const form = document.getElementById(formId);
  const formR = form.getElementsByClassName('form_required');

  if (formR.length === 0) retun;

  let countValid = formR.length;
  for (let x = 0; x < formR.length; x++) {
    const input = formR[x].getElementsByClassName('required');

    if (input.length > 0) {
      let i = 0;
      let find = false;

      while (i <= input.length && !find) {
        if (input[i].type === 'checkbox' && input[i].checked) {
          countValid--;
          find = true;
          formR[x].getElementsByClassName('message--error')[0].setAttribute("class", "message message--error");
        } else if (input[i].type === 'checkbox' && !input[i].checked) {
          formR[x].getElementsByClassName('message--error')[0].setAttribute("class", "message message--error show");
        }

        if ((input[i].type === 'text' || input[i].type === 'tel' || input[i].type === 'email') && input[i].value !== '') {
          countValid--;
          find = true;
          formR[x].getElementsByClassName('message--error')[0].setAttribute("class", "message message--error");
        } else if ((input[i].type === 'text' || input[i].type === 'tel' || input[i].type === 'email') && input[i].value === '') {
          formR[x].getElementsByClassName('message--error')[0].setAttribute("class", "message message--error show");
        }

        if (input[i].selectedIndex > 0) {
          countValid--;
          find = true;
          formR[x].getElementsByClassName('message--error')[0].setAttribute("class", "message message--error");
        } else if (input[i].selectedIndex === 0) {
          formR[x].getElementsByClassName('message--error')[0].setAttribute("class", "message message--error show");
        }

        if (i + 1 === input.length) {
          find = true;
        }

        i++;
      }
    }

    if (x + 1 === formR.length && countValid === 0) {
      if (formId === 'form-for-service') {
        form.classList.add('forms__content--hide');
        form.nextSibling.nextSibling.classList.remove('forms__content--hide');
      } else {
        form.nextSibling.nextSibling.classList.remove('hide');
        form.classList.add('forms__content--hide');
      }

      if (formId !== 'form-for-service') return
      let tabsItem = document.querySelector('.tabs').children;

      for (var i = 0; i < tabsItem.length; i++) {
        if (tabsItem[i].classList.contains('tabs__item--active')) {
          tabsItem[i].classList.remove('tabs__item--active');
        } else {
          tabsItem[i].classList.add('tabs__item--active');
        }
      }
    }
  }
}

export default validationForm;
