'use strict';

window.addEventListener('DOMContentLoaded', (evt) => {
    //Задание 1-2
    const replaceMarks = () => {
        let paragraph = document.querySelector('.regexp');
        
        const replacer = (str, offset, s) => {
            let newStr = str.replace(`'`, `"`);
            return `${newStr}`;
        };
        
        paragraph.innerHTML = paragraph.innerHTML.replace(/( ?[^a-z]')/ig, replacer);
    };
      
    replaceMarks();

    const validateFrom = () => {
        const name = document.getElementById('name'),
              phone = document.getElementById('phone'),
              email = document.getElementById('email'),
              form = document.getElementById('form'),
              statusBlock = document.querySelector('.status');

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const nameTest = /[a-zа-яА-Я ]+/gi,
                  phoneTest = /\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}/,
                  emailText = /[a-z.-]+@mail\.ru/gi;

            if(!nameTest.test(name.value) || !phoneTest.test(phone.value) || !emailText.test(email.value)) {
                statusBlock.textContent = 'Одно или несколько полей не прошли проверку!';
                name.classList.add('err');
                phone.classList.add('err');
                email.classList.add('err');
            } else {
                statusBlock.textContent = 'Сообщение отправлено!';
                name.classList.remove('err');
                phone.classList.remove('err');
                email.classList.remove('err');
            }

        });

    };

    validateFrom();
});