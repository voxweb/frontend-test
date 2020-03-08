'use strict';

(() => {
  const ESC_KEYCODE = 27;
  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.js-burger');
  const menu = document.querySelector('.js-menu');
  const selects = document.querySelectorAll('.js-select');
  const datePicker = document.querySelector('.js-date-picker input');
  const overlay = document.querySelector('.js-overlay');
  const datePickerText = 'Выберите дату не позднее которой хотите вернуться';
  let customDatePicker;

  if (datePicker) {
    customDatePicker = new Litepicker({
      element: datePicker,
      singleMode: false,
      lang: 'ru-RU',
      format: 'DD-MM-YYYY',
      buttonText: {
        previousMonth: '',
        nextMonth: '',
      },
      showTooltip: false,
      mobileFriendly: false,
      onShow: function() {
        datePicker.parentElement.classList.add('is-open');
        datePicker.click();
      },
      onRender: function() {
        addDatePickerText(this);
      },
      onHide: function() {
        datePicker.parentElement.classList.remove('is-open');
      }
    });
  }

  if (burger) {
    burger.addEventListener('click', (evt) => {
      evt.stopPropagation();

      if (!burger.classList.contains('menu-opened')) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMenu();
    });
  }

  function addDatePickerText(litepicker) {
    let datePickerTextElement = document.createElement('p');
    datePickerTextElement.classList.add('month-item__text');
    datePickerTextElement.textContent = datePickerText;
    litepicker.picker.querySelector('.month-item').append(datePickerTextElement);
  }

  function openMenu() {
    burger.classList.add('menu-opened');
    header.classList.add('menu-opened');
    document.body.classList.add('modal-opened');
    document.addEventListener('keydown', onDocumentEscPress);
    menu.addEventListener('scroll', onMenuScroll);
  }

  function closeMenu() {
    closeDropdowns();
    burger.classList.remove('menu-opened');
    header.classList.remove('menu-opened');
    document.body.classList.remove('modal-opened');
    document.removeEventListener('keydown', onDocumentEscPress);
    menu.removeEventListener('scroll', onMenuScroll);
  }

  function closeDropdowns() {
    let openedDropdowns = document.querySelectorAll('.is-open');
    if (openedDropdowns.length) {
      openedDropdowns.forEach((dropdown) => {
        dropdown.classList.remove('is-open');
      });
    }

    customDatePicker.hide();
  }

  function onDocumentEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeMenu();
    }
  }

  function onMenuScroll() {
    let top = datePicker.getBoundingClientRect().top + datePicker.getBoundingClientRect().height;
    customDatePicker.picker.style.top = `${top}px`;
  }

  if (selects.length) {
    selects.forEach((select) => {
      const input = select.querySelector('input');
      const button = select.querySelector('button');
      const sublistsOpeners = select.querySelectorAll('.js-open-select-sublist');
      const valueElements = select.querySelectorAll('.js-select-value');
      const allValueElements = select.querySelectorAll('.js-select-all-value');

      if (button) {
        button.addEventListener('click', (evt) => {
          evt.stopPropagation();

          if (!select.classList.contains('is-open')) {
            openSelect();
          } else {
            closeSelect();
          }
        });
      }

      if (sublistsOpeners.length) {
        sublistsOpeners.forEach((opener) => {
          opener.addEventListener('click', () => {
            opener.classList.toggle('is-open');
          });
        });
      }

      if (valueElements.length) {
        setSelectValue(valueElements, false);
      }

      if (allValueElements.length) {
        setSelectValue(allValueElements, true);
      }

      function openSelect() {
        selects.forEach((select) => {
          select.classList.remove('is-open');
        });

        select.classList.add('is-open');
        document.addEventListener('click', onDocumentClick);
      }

      function closeSelect() {
        select.classList.remove('is-open');
        document.removeEventListener('click', onDocumentClick);
      }

      function onDocumentClick(evt) {
        if (!evt.target.matches('.select__list, .select__list *')) {
          closeSelect();
        }
      }

      function setSelectValue(elements, hasDataAttribute) {
        elements.forEach((element) => {
          const value = hasDataAttribute ? element.dataset.value : element.textContent;

          element.addEventListener('click', () => {
            input.value = value;
            button.textContent = value;
            closeSelect();
          });
        });
      }
    });
  }
})();
