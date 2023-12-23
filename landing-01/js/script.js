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




});
