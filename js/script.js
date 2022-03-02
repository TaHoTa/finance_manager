// Get input and validate --- 
function getInput(inputType) {
    const input = document.getElementById(inputType + '_input');
    inputValue = input.value;
    // Handle input error -------------- 
    if (isNaN(inputValue)) {
        alert("Please put a number in " + inputType + " field!");
        return 0;
    }
    else if (inputValue < 0) {
        alert("Please put a positive number in " + inputType + " field!");
        return 0;
    }
    else {
        return parseFloat(inputValue);
    }

}

// Function for push input into texts -------- 
function pushInputInText(textInput, inputValue) {
    const text = document.getElementById(textInput);
    const textValue = parseFloat(text.innerText);
    text.innerText = inputValue;
}


document.getElementById('calculate_button').addEventListener('click', function () {
    // Get input and validate --- 
    const incomeValidated = getInput('income');
    const foodValidated = getInput('food');
    const rentValidated = getInput('rent');
    const clothsValidated = getInput('cloths');

    const TotalExpenses = foodValidated + rentValidated + clothsValidated;
    const balance = incomeValidated - TotalExpenses;

    // Handle excess income --------- 
    if (incomeValidated == 0) {
        pushInputInText('total_expenses', 0);
        pushInputInText('total_balance', 0);
    }
    else if (TotalExpenses > incomeValidated) {
        alert("Expenses can not be greater than income");
        pushInputInText('total_expenses', 0);
        pushInputInText('total_balance', 0);
    }
    else {
        pushInputInText('total_expenses', TotalExpenses)
        pushInputInText('total_balance', balance)
    }

    // Handle save -------------- 
    document.getElementById('save_button').addEventListener('click', function () {

        const saveValidated = getInput('save');
        if (saveValidated < 0 || saveValidated > 100) {
            alert("Please input a value between 0 to 100");
            pushInputInText('total_save', 0);
            pushInputInText('remaining_balance', 0);
        }
        else {

            const balanceText = document.getElementById('total_balance').innerText;
            const balanceValue = parseFloat(balanceText);

            const saveValue = parseFloat(((saveValidated / 100) * balanceValue).toFixed(2));
            const updatedBalance = parseFloat((balanceValue - saveValue).toFixed(2));
            pushInputInText('total_save', saveValue);
            pushInputInText('remaining_balance', updatedBalance);

            console.log(balanceValue);
            console.log(saveValue);
            console.log(updatedBalance);

            console.log(saveValidated);
            console.log(updatedBalance);

        }

        makeInpurEmpty('save');
        // End of save button click ----------------
    })

    // make all field empty -------- 
    makeInpurEmpty('income');
    makeInpurEmpty('food');
    makeInpurEmpty('rent');
    makeInpurEmpty('cloths');

    // calculate_button end -----------
})

function makeInpurEmpty(inputType) {
    const input = document.getElementById(inputType + '_input');
    input.value = '';
}
