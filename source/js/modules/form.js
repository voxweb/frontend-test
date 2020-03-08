'use strict';

(() => {
  const SUCCESS_CODE = 200;
  const form = document.querySelector('.request form');
  const submitBtn = document.querySelector('.request button');
  const inputs = document.querySelectorAll('input');
  const telInput = document.querySelector('.js-tel input');
  const maskOptions = {
    mask: '+{7} 000 000 00 00'
  };

  if (submitBtn) {
    submitBtn.addEventListener('click', (evt) => {
      evt.preventDefault();

      let isValid = validateFormData();

      if (isValid) {
        sendFormData();
      }
    });
  }

  if (telInput) {
    IMask(telInput, maskOptions);
  }

  function validateFormData() {
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.validity.valid) {
        input.parentElement.classList.add('request__invalid-input');
        input.addEventListener('input', onInputChange);
        isValid = false;
      }

      function onInputChange() {
        input.parentElement.classList.remove('request__invalid-input');
        input.removeEventListener('input', onInputChange);
      }
    });

    return isValid;
  }

  function sendFormData() {
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.open('POST', form.action);
    xhr.send(formData);

    xhr.addEventListener('load', () => {
      if (xhr.status === SUCCESS_CODE) {
        form.reset();
        alert('SUCCESS!');
      }
    });
  }
})();
