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
});