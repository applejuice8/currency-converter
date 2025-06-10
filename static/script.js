function fetchInfo(box) {
    let fromCurrency = document.querySelector('.from-currency').value;
    let toCurrency = document.querySelector('.to-currency').value;
    let amount;

    if (box === 'amountBox') {
        amount = document.querySelector('.amount').value;

        if (fromCurrency != toCurrency) {
            convertCurrency(amount, fromCurrency, toCurrency, '.result');
        } else {
            document.querySelector('.result').value = amount;
        }
    } else {
        amount = document.querySelector('.result').value;

        if (fromCurrency != toCurrency) {
            convertCurrency(amount, toCurrency, fromCurrency, '.amount');
        } else {
            document.querySelector('.amount').value = amount;
        }
    }
    fetchExchangeRate(fromCurrency, toCurrency);
}

function convertCurrency(amount, fromCurrency, toCurrency, selector) {
    if (amount > 0) {
        let url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            let convertedAmount = Object.values(data.rates)[0];
            document.querySelector(selector).value = convertedAmount;
        })
    } else {
        document.querySelector(selector).value = 0;
    }
}

function fetchExchangeRate(fromCurrency, toCurrency) {
    if (fromCurrency != toCurrency) {
        let url = `https://api.frankfurter.app/latest?amount=1&from=${fromCurrency}&to=${toCurrency}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = Object.values(data.rates)[0];
            document.querySelector('.exchange-rate').innerHTML = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
        })
    } else {
        document.querySelector('.exchange-rate').innerHTML = `1 ${fromCurrency} = 1 ${toCurrency}`;
    }
}
