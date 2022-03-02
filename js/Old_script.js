// Get income amount ------------ 
function getIncome() {
    const incomeValue = document.getElementById("income_input");
    const incomeAmount = incomeValue.value;
    const incomeFloat = parseFloat(incomeAmount);

    return incomeFloat;
}

// Get Total expenses -------------
function getExpenses(incomeCheck) {
    const foodExpenses = parseFloat(document.getElementById('food_input').value);
    const rentExpenses = parseFloat(document.getElementById('rent_input').value);
    const clothsExpenses = parseFloat(document.getElementById('cloths_input').value);

    // make input empty ---------
    document.getElementById('income_input').value = '';
    document.getElementById('food_input').value = '';
    document.getElementById('rent_input').value = '';
    document.getElementById('cloths_input').value = '';

    // Error handle --------- 

    if (foodExpenses > 0 && rentExpenses > 0 && clothsExpenses > 0 && incomeCheck > 0) {
        return foodExpenses + rentExpenses + clothsExpenses;
    }
    else if (foodExpenses < 0 || rentExpenses < 0 || clothsExpenses < 0 || incomeCheck < 0) {
        document.getElementById('error_positive').style.display = 'block';
        document.getElementById('error_number').style.display = 'none';
        document.getElementById('error_large').style.display = 'none';
        return 0;

    }
    else {
        document.getElementById('error_number').style.display = 'block';
        document.getElementById('error_positive').style.display = 'none';
        document.getElementById('error_large').style.display = 'none';
        return 0;
    }


}


document.getElementById('calculate_button').addEventListener('click', function () {
    // Get input elements --------------
    const incomeAmount = getIncome();
    const expensesAmount = getExpenses(incomeAmount);

    if (incomeAmount > expensesAmount) {
        // update total expenses ----------
        const oldTotalExpenses = document.getElementById('total_expenses');
        const oldTotalExpensesInnerText = parseFloat(oldTotalExpenses.innerText);
        oldTotalExpenses.innerText = expensesAmount;

        // update balance -------------- 
        const oldBalance = document.getElementById('total_balance');
        const oldTotalBalanceText = parseFloat(oldBalance.innerText);
        const newBalance = incomeAmount - expensesAmount;

        // Balance update fix due to unexpected income value ==== 
        if (newBalance >= 0) {
            oldBalance.innerText = newBalance;
        }
        else {
            oldBalance.innerText = 0;
        }

        // Handle save ------------- 
        document.getElementById('save_button').addEventListener('click', function () {

            const saveParcentage = document.getElementById('save_input');
            const saveFloat = parseFloat(saveParcentage.value);
            if (saveFloat > 100 || saveFloat < 0) {
                document.getElementById('save_input').value = '';
                const oldSave = document.getElementById('total_save');
                oldSave.innerText = 'put 0 to 100';

            }
            else {
                // Save value ------ 
                const saveValue = ((saveFloat / 100) * newBalance).toFixed(2);
                const updatedBalance = (newBalance - saveValue).toFixed(2);

                // update save -------------- 
                const oldSave = document.getElementById('total_save');
                const oldTotalSaveText = parseFloat(oldSave.innerText);
                oldSave.innerText = saveValue;

                // Update New Balance -----------
                const oldRenainingBalance = document.getElementById('remaining_balance');
                const oldRenainingBalanceText = parseFloat(oldRenainingBalance.innerText);
                oldRenainingBalance.innerText = updatedBalance;
            }


        })
        document.getElementById('error_large').style.display = 'none';
        document.getElementById('error_number').style.display = 'none';
        document.getElementById('error_positive').style.display = 'none';
    }

    else {
        document.getElementById('error_number').style.display = 'block';
        document.getElementById('error_positive').style.display = 'none';
    }


})




