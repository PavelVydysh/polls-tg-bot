let optionCount = 2;

window.Telegram.WebApp.ready();

function addOption() {
    if(optionCount >= 10) {
        return;
    }

	optionCount++;
    const optionsContainer = document.getElementById('optionsContainer');
    const newOption = document.createElement('div');
    newOption.innerHTML = `
        <label for="option${optionCount}">${optionCount}.</label>
        <input id="option${optionCount}" type="text" placeholder="Введите вариант ответа"/>
        <button type="button" onclick="deleteOption(this)">-</button>
    `;
    optionsContainer.appendChild(newOption);

    if(optionCount >= 10) {
        const addOptionButton = document.getElementById('addOptionButton');
        addOptionButton.disabled = true;
    } else if(optionCount > 2) {
        const options = document.querySelectorAll('#optionsContainer > div');
        options.forEach((option) => {
            const button = option.querySelector('button');
            button.disabled = false;
        });
    }
}

function deleteOption(button) {
    if(optionCount <= 2) {
        return;
    }

    optionCount--;
    const optionDiv = button.parentNode;
    optionDiv.parentNode.removeChild(optionDiv);

    const options = document.querySelectorAll('#optionsContainer > div');
    options.forEach((option, index) => {
        const label = option.querySelector('label');
        label.textContent = `${index + 1}.`;
    });

    const addOptionButton = document.getElementById('addOptionButton');
    if (optionCount < 10) {
        addOptionButton.disabled = false;
    }
    
    if(optionCount == 2) {
        const options = document.querySelectorAll('#optionsContainer > div');
        options.forEach((option) => {
            const button = option.querySelector('button');
            button.disabled = true;
        });
    }
}

function checkFormValidity() {
    const title = document.getElementById('title').value.trim();
    const options = document.querySelectorAll('#optionsContainer input');
    let allFilled = true;

    options.forEach(option => {
        if (option.value.trim() === '') {
            allFilled = false;
        }
    });

    if (title !== '' && options.length >= 2 && allFilled) {
        window.Telegram.WebApp.MainButton.setText("Создать");
        window.Telegram.WebApp.MainButton.show();
        window.Telegram.WebApp.MainButton.enable();
    } else {
        window.Telegram.WebApp.MainButton.hide();
    }
}
