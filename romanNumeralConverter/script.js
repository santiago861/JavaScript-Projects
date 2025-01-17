const input = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const romanNumbers = [['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
                      ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
                      ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
                      ['', 'M', 'MM', 'MMM']]

const checkValidInput = (input) => {
    if (!input || input < 1 || input > 3999) {
        output.classList.remove('valid');
        output.classList.add('invalid');

        if (!input) {
            return 'Please enter a valid number';
        } else if (input < 1) {
            return 'Please enter a number greater than or equal to 1';
        } else if (input > 3999) {
            return 'Please enter a number less than or equal to 3999';
        }  
    } else {
        output.classList.remove('invalid');
        output.classList.add('valid');

        return convertInputToRoman(input)
    }   
}

const chainMinusZero = (int) => {
    let chainInt = String(int);
    let trimedChain = '';

    for (let i = 0; i < chainInt.length; i++) {
        if (chainInt[i] != 0) {
            trimedChain += chainInt.substring(i,);
            return trimedChain;
        }
    }
}

const convertInputToRoman = (int) => {
    let revertStr = []
    let trimedChain = chainMinusZero(int)

    for (let char of trimedChain) {
        revertStr.unshift(char);
    }
    for (let elem of revertStr) {
        if (revertStr.indexOf(elem) == 0) {
            revertStr[0] = romanNumbers[0][elem];
        } else if (revertStr.indexOf(elem) == 1) {
            revertStr[1] = romanNumbers[1][elem];
        } else if (revertStr.indexOf(elem) == 2) {
            revertStr[2] = romanNumbers[2][elem];
        } else if (revertStr.indexOf(elem) == 3) {
            revertStr[3] = romanNumbers[3][elem];
        }
    }
    return revertStr.reverse().join('');
}

convertBtn.addEventListener('click', (btn) => {
    btn.preventDefault();
    const inputValue = input.value; 
    output.textContent = checkValidInput(inputValue);

})

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const inputValue = input.value;
        output.textContent = checkValidInput(inputValue);
    }
})
