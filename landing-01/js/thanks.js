
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
        c.addEventListener("click", function (e) {
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
    a.addEventListener("click", function (e) {
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
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.form--thank')

    form.addEventListener('submit', function (event) {
        var userId = window.location.pathname.split('/thanks/')[1]; 

        event.preventDefault(); // Зупинити дефолтне відправлення форми

        // Зібрати дані з форми
        var data = {
            userId,
            height: document.getElementById('heightValue').value,
            weight: document.getElementById('weightValue').value,
            birthYear: document.getElementById('yearValue').value,
            goals: document.querySelector('.form__wishes-option.active').getAttribute('data-wishe'),
            gender: document.querySelector('.form__sex-option.active').getAttribute('data-sex'),
            activity: document.querySelector('.custom-select select').value
        };

        // Вивести дані в консоль
        console.log('Зібрані дані для локального використання:', data);

        // Тепер відправте дані на сервер, якщо потрібно
        submitForm(data);
    });


    function submitForm(data) {
        // Ваш код для відправлення даних на сервер
        // Я використав ваш приклад Ajax-запиту
        $.ajax({
            url: '/api/update_data',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                if (response.redirectUrl) {
                    // Перенаправлення на вказаний URL
                    window.location.href = response.redirectUrl;
                } else {
                    // Ваша логіка обробки успішної відповіді
                }
            },
            error: function (error) {
                console.error('Помилка при відправленні даних на сервер:', error);
            }
        });
    }
});