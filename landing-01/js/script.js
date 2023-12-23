document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      796: {
        slidesPerView: 3
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains('error')) {
      parent.classList.remove('error');
    }
  }

  function createError(input) {
    const parent = input.parentNode;
    parent.classList.add('error');
  }

  function validation(form) {
    let result = true;
    const allInputs = form.querySelectorAll('input');



    // Clear existing errors
    allInputs.forEach(input => removeError(input));

    allInputs.forEach(input => {
      if (input.value.trim() === '') {
        result = false;
        createError(input);
      }

      if (input.classList.contains('input__numb') && input.value.length < 17) {
        result = false;
        createError(input)
      }
      if (input.classList.contains('input__gmail') && !isValidEmail(input.value)) {
        result = false;
        createError(input)
      }


      function isValidEmail(email) {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
      // Additional validation checks can be added here if needed

      return result;
    });

    return result;
  }

  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    if (validation(this)) {
      // Clear errors after successful submission if needed
      const allInputs = this.querySelectorAll('input');
      allInputs.forEach(input => {
        input.value = ''
        removeError(input)
      });

      // Your success handling code here
      document.querySelector('.popup--form').classList.remove('active');
      document.querySelector('.popup--thanks').classList.add('active');
    }
  });

  window.addEventListener('click', (e) => {
    let unlockPopup = true
    const body = document.querySelector('body')
    if (e.target.classList.contains('advantages__list-item__btn')) {
      e.target.classList.toggle('active')
      let nextElement = e.target.nextElementSibling;
      if (nextElement) {
        nextElement.classList.toggle('active');
        nextElement.style.maxHeight = nextElement.classList.contains('active') ? nextElement.scrollHeight + 'px' : 0;
        nextElement.style.marginBottom = nextElement.classList.contains('active') ? 16 + 'px' : 0;
      }
    }
    if (e.target.closest('.button--popup')) {
      const popupForm = document.querySelector('.popup--form')
      const popupThanks = document.querySelector('.popup--thanks')

      if (unlockPopup) {
        body.classList.add('body--lock')
        popupForm.classList.add('active')
      }

    }
    if (!e.target.closest('.popup__content') || e.target.closest('.popup__close')) {
      const popup = e.target.closest('.popup')
      if (popup) {
        e.preventDefault()
        popup.classList.remove('active')
        body.classList.remove('body--lock')
      }
    }
    if (e.target.closest('.accordion')) {
      let accordion = e.target;
      accordion.classList.toggle('active');

      let panel = accordion.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }
  })
  function updateCountdown() {
    const targetTime = new Date();
    targetTime.setHours(23, 59, 59, 999); // встановлюємо час 14:35:00
    const currentTime = new Date();

    let timeDifference = targetTime - currentTime;
    if (timeDifference < 0) {
      timeDifference += 24 * 60 * 60 * 1000; // якщо час вже минув, додаємо 24 години
    }

    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    const countdownElement = document.querySelectorAll('.clock__content-oclock');
    for (let i = 0; i < countdownElement.length; i++) {
      countdownElement[i].textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }

  // Оновлення таймера кожну секунду
  setInterval(updateCountdown, 1000);

  // Один раз оновлюємо таймер, щоб відразу відобразити коректний час
  updateCountdown();



  var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

function updateInputValue(type) {
  var inputElement = document.getElementById(type + 'Value');
  var rangeElement = document.getElementById('range' + type.charAt(0).toUpperCase() + type.slice(1));

  var numericValue = parseFloat(rangeElement.value);

  // Перевірка, чи значення є числовим
  if (!isNaN(numericValue)) {
      var dimension = '';

      // Додаємо відповідну розмірність в залежності від типу
      switch (type) {
          case 'height':
              dimension = 'см';
              break;
          case 'weight':
              dimension = 'кг';
              break;
      }

      inputElement.value = numericValue + dimension;
  } else {
      inputElement.value = rangeElement.value; // Залишити без змін, якщо не є числом
  }
}

function updateRangeValue(type) {
  var inputElement = document.getElementById(type + 'Value');
  var rangeElement = document.getElementById('range' + type.charAt(0).toUpperCase() + type.slice(1));

  // Перевірка на числове значення та встановлення границь
  var value = parseFloat(inputElement.value) || 0;
  value = Math.min(Math.max(value, parseFloat(rangeElement.min)), parseFloat(rangeElement.max));

  rangeElement.value = value;


}

// Додавання обробників подій для ползунків
document.getElementById('rangeYear').addEventListener('input', function () {
  updateInputValue('year');
});

document.getElementById('rangeHeight').addEventListener('input', function () {
  updateInputValue('height');
});

document.getElementById('rangeWeight').addEventListener('input', function () {
  updateInputValue('weight');
});

// Додавання обробників подій для текстових інпутів
document.getElementById('yearValue').addEventListener('input', function () {
  updateRangeValue('year');
});

document.getElementById('heightValue').addEventListener('input', function () {
  updateRangeValue('height');
});

document.getElementById('weightValue').addEventListener('input', function () {
  updateRangeValue('weight');
});

function toggleOption(element) {
  var siblings = Array.from(element.parentElement.children);

  siblings.forEach(function (el) {
      el.classList.remove('active');
  });

  element.classList.add('active');
}

// Додавання обробників подій для кожного елемента
document.querySelectorAll('.form__sex-option, .form__wishes-option').forEach(function (option) {
  option.addEventListener('click', function () {
      toggleOption(option);
  });
});

});
