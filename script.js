document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.coinlore.net/api/tickers/')
        .then(response => response.json())
        .then(data => {
            const cryptoPricesContainer = document.getElementById('crypto-prices');
            const desiredCryptos = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH'];
            const filteredCryptos = data.data.filter(crypto => desiredCryptos.includes(crypto.symbol));

            desiredCryptos.forEach(symbol => {
                const crypto = filteredCryptos.find(c => c.symbol === symbol);
                if (crypto) {
                    const cryptoElement = document.createElement('div');
                    cryptoElement.classList.add('crypto-prices__item');
                    const priceChange = parseFloat(crypto.percent_change_24h).toFixed(2);
                    const changeClass = priceChange >= 0 ? 'crypto-prices__change--positive' : 'crypto-prices__change--negative';
                    const arrowIcon = priceChange >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
                    cryptoElement.innerHTML = `
                        <div class="crypto-prices__header">
                            <img src="files/${crypto.symbol.toLowerCase()}.png" alt="${crypto.name} logo" class="crypto-prices__icon">
                            <div class="crypto-prices__name">${crypto.symbol}</div>
                            <div class="crypto-prices__symbol">${crypto.name}</div>
                        </div>
                        <div class="crypto-prices__price">$${parseFloat(crypto.price_usd).toFixed(2)}</div>
                        <div class="crypto-prices__change ${changeClass}">
                          
                            <i class="crypto-prices__arrow fas ${arrowIcon}"></i>
                              ${priceChange}%
                        </div>
                    `;
                    cryptoPricesContainer.appendChild(cryptoElement);
                }
            });
        })
        .catch(error => console.error('Error fetching crypto data:', error));
});
