let optionCount = 2;

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
