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


    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight){
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }
          });
    }
});

