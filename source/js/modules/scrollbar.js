'use strict';

(() => {
  checkScrollbar();

  function checkScrollbar() {
    let scrollbarWidth = getScrollbarWidth();

    if (scrollbarWidth > 0) {
      document.body.classList.add('has-scrollbar');
    } else {
      document.body.classList.remove('has-scrollbar');
    }
  }

  function getScrollbarWidth() {
    let inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    let outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.append(inner);

    document.body.append(outer);
    let widhtBefore = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widhtAfter = inner.offsetWidth;
    if (widhtBefore == widhtAfter) {
      widhtAfter = outer.clientWidth;
    }

    document.body.removeChild(outer);

    return (widhtBefore - widhtAfter);
  };
})();
