const input = document.getElementById('text-input');
const button = document.getElementById('check-btn');
const result = document.getElementById('result');
const regex = /[^a-zA-Z0-9]/g;
let inputValue = '';
let completeInp = '';


button.addEventListener('click', () => {
    completeInp = input.value;
    inputValue = input.value.toLowerCase().replace(regex, '');
    let arr = [];
    let reversed = [];
    let palindrome = true;
    
    if (inputValue.length == 0) {
        alert('Please input a value')
    }

    for (let char of inputValue) {
        arr.push(char);
        reversed.unshift(char);
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== reversed[i]) {
            palindrome = false;
        }
    }

    if (arr.length === 0) {
        result.innerText = 'Please input a value';
    } else {
        if (palindrome) {
            result.innerText = `${completeInp} is a palindrome`;
        } else {
            result.innerText = `${completeInp} is not a palindrome`;
        }  
    }
    
})
