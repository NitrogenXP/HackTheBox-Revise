//Created by https://x.com/nitrogenxp
function maskValue(value) {
    return value.split('').map(char => char === ' ' ? ' ' : '*').join('');
}

function createRevealButton(input, originalValue, maskedValue) {
    const button = document.createElement('button');
    button.textContent = 'Reveal Answer';
    button.id = 'revealBtn';
    button.className = 'btn btn-outline-success';
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

    moveButtonToNextDiv(button);
}

function moveButtonToNextDiv(button) {
    const currentParent = button.parentElement; 

    if (currentParent.nextElementSibling) {
        const nextDiv = currentParent.nextElementSibling; 

        const newDiv = document.createElement('div');
        newDiv.appendChild(button);

        nextDiv.insertBefore(newDiv, nextDiv.firstChild);
    }
}

function showToast(type, title, message) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '85%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0.9';
    toast.style.textAlign = 'center';

    const toastTitle = document.createElement('div');
    toastTitle.className = 'toast-title';
    toastTitle.textContent = title;

    const toastMessage = document.createElement('div');
    toastMessage.className = 'toast-message';
    toastMessage.textContent = message;

    toast.appendChild(toastTitle);
    toast.appendChild(toastMessage);
    document.body.appendChild(toast);

    setTimeout(function () {
        toast.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
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
            showToast('success', 'Success', 'Congratulations! You earned 0 cubes!');
        } else {
            input.value = maskedValue;
            showToast('error', 'Error', 'Incorrect answer!');
        }
    });
}

function removeDisabledSubmitButtons() {
    const submitButtons = document.querySelectorAll('button[class="btn btn-primary btn-block btnAnswer"]:disabled');
    submitButtons.forEach(button => {
        button.disabled = false;

        const newButton = button.cloneNode(true);
    
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
    });
}

const inputs = document.querySelectorAll('input[type="text"].form-control.text-success[disabled="true"]');
inputs.forEach(processInputElement);

removeDisabledSubmitButtons();