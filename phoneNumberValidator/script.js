const input = document.getElementById('user-input');
const check = document.getElementById('check-btn');
const clear = document.getElementById('clear-btn');
const recordList = document.getElementById('results-div');
const result = document.getElementById('result');
const regexNum = /^\s*(?:\+?1)?[ -]?\((?:[2-9]\d{2})\)[ -]?\d{3}[ -]?\d{4}\s*$|^\s*(?:\+?1)?[ -]?(?:[2-9]\d{2})[ -]?\d{3}[ -]?\d{4}\s*$/

const clearRecord = () => {
    recordList.innerHTML = ``
}

const checkInput = (inp) => {
    if (!inp) {
        alert("Please provide a phone number");
        return;
    } else if (regexNum.test(inp)) {
        result.innerText = `${inp}`;
        result.classList.remove('hidden');
        result.classList.remove('invalid');
        result.classList.add('valid');
        recordList.innerHTML += `<p class="valid">Valid US number: ${inp}</p>`
    } else {
        result.innerText = `${inp}`
        result.classList.remove('hidden');
        result.classList.remove('valid');
        result.classList.add('invalid');
        recordList.innerHTML += `<p class="invalid">Invalid US number: ${inp}</p>`
    }
} 

clear.addEventListener('click', clearRecord)

check.addEventListener('click',() => {
    const inputValue = input.value;
    checkInput(inputValue);
    input.value = ''
})

input.addEventListener('keydown', (e) => {
    const inputValue = input.value;
    if (e.key == 'Enter') {
        checkInput(inputValue);
        input.value = '';
    }
})
