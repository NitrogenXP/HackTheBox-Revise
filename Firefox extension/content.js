
// Created by NitrogenXP

function maskValue(value) {
    return value.split('').map(char => char === ' ' ? ' ' : '*').join('');
}
function createRevealButton(input, originalValue, maskedValue) {
    const button = document.createElement('button');
    button.textContent = 'Reveal Answer';
    button.style.marginLeft = '10px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', function () {
        if (input.value === maskedValue) {
            input.value = originalValue; 
            button.textContent = 'Hide Answer';
        } else {
            input.value = maskedValue; 
            button.textContent = 'Reveal Answer';
        }
    });
    input.parentNode.insertBefore(button, input.nextSibling);
}
function processInputElement(input) {
    const originalValue = input.value;
    const maskedValue = maskValue(originalValue);

    input.value = maskedValue;

    input.disabled = false;

    createRevealButton(input, originalValue, maskedValue);

    input.addEventListener('change', function () {
        const userInput = input.value;

        if (userInput.toLowerCase() === originalValue.toLowerCase()) {
            input.value = originalValue;
            input.disabled = true;
            alert('Value is correct!');
        } else {
            input.value = maskedValue;
            alert('Incorrect value, try again.');
        }
    });
}

// Select all relevant input elements and process them
const inputs = document.querySelectorAll('input[type="text"].form-control.text-success[disabled="true"]');
inputs.forEach(processInputElement);
