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
  for (let hour = 6; hour <= 19; hour++) {
    const cust = this.getRandomCust();
    const cookieSold = Math.round(cust * this.avgCookieSale);
    this.cookiePerHour.push(cookieSold);
  }
};

CookieSales.prototype.displaySales = function () {
  const salesList = document.createElement('ul');
  salesList.innerHTML = `<strong>${this.name}</strong>`;
  let totalCookies = 0;
  for (let hour = 6; hour <= 19; hour++) {
    const listItems = document.createElement('li');
    listItems.textContent = `${hour}am: ${this.cookiePerHour[hour - 6]} cookies`;
    salesList.appendChild(listItems);
    totalCookies += this.cookiePerHour[hour - 6];
  }

  const totalItems = document.createElement('li');
  totalItems.textContent = `Total: ${totalCookies} cookies`;
  salesList.appendChild(totalItems);

  hourSection.appendChild(salesList); 
};

const seattle = new CookieSales('seattle', 23, 65, 6.3);

const tokyo = new CookieSales('tokyo', 3, 24, 1.2);
const dubai = new CookieSales('dubai', 11, 38, 3.7);
const paris = new CookieSales('paris', 20, 38, 2.3);
const lima = new CookieSales('lima', 2, 16, 4.6);

seattle.calculateCookiePerHour();
seattle.displaySales();

tokyo.calculateCookiePerHour();
tokyo.displaySales();

dubai.calculateCookiePerHour();
dubai.displaySales();

paris.calculateCookiePerHour();
paris.displaySales();

lima.calculateCookiePerHour();
lima.displaySales();