'use strict';

const hourSection = document.getElementById('hours');

function CookieSales(name, minCust, maxCust, avgCookieSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
  this.cookiePerHour = [];
}

CookieSales.prototype.getRandomCust = function () {
return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
};

CookieSales.prototype.calculateCookiePerHour = function () {
  for (let hour = 6; hour <= 20; hour++) {
    const cust = this.getRandomCust();
    const cookieSold = Math.round(cust * this.avgCookieSale);
    this.cookiePerHour.push(cookieSold);
  }
};

CookieSales.prototype.displaySales = function () {
  const salesList = document.createElement('ul');
  salesList.innerHTML = `<strong>${this.name}</strong>`;
  let totalCookies = 0;
  for (let hour = 6; hour <= 20; hour++) {
    const listItems = document.createElement('li');
    let displayHour;

    if (hour <= 12) {
      displayHour = `${hour}am`;
    } else if (hour === 12) {
      displayHour = `${hour}pm`;
    } else {
      displayHour = `${hour - 12}pm`;
    }

    listItems.textContent = `${displayHour}: ${this.cookiePerHour[hour - 6]} cookies`;
    salesList.appendChild(listItems);
    totalCookies += this.cookiePerHour[hour - 6];
  }
  
  const totalItems = document.createElement('li');
  totalItems.innerHTML = `<strong>Total: ${totalCookies} cookies</strong>`;
  salesList.appendChild(totalItems);

hourSection.appendChild(salesList);
};

const seattle = new CookieSales('seattle', 23, 65, 6.3);

seattle.calculateCookiePerHour();
seattle.displaySales();