'use strict';

const hourSection = document.getElementById('hours');
const tableContainer = document.getElementById('table-container'); 

function CookieSales(name, minCust, maxCust, avgCookieSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
  this.cookiePerHour = [];
  this.totalCookies = 0;
}

CookieSales.prototype.getRandomCust = function () {
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
};

CookieSales.prototype.calculateCookiePerHour = function () {
  for (let hour = 6; hour <= 20; hour++) {
    const cust = this.getRandomCust();
    const cookieSold = Math.round(cust * this.avgCookieSale);
    this.cookiePerHour.push(cookieSold);
    this.totalCookies += cookieSold;
  }
};

CookieSales.prototype.render = function () {
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `<td>${this.name}</td>`;
  
  for (let hour = 6; hour <= 20; hour++) {
    tableRow.innerHTML += `<td>${this.cookiePerHour[hour - 6]}</td>`;
  }

  tableRow.innerHTML += `<td>${this.totalCookies}</td>`;

  tableContainer.appendChild(tableRow);
};


function createHeaderRow() {
  const tableHeader = document.createElement('tr');
  tableHeader.innerHTML = '<th>Location</th>';
  
  for (let hour = 6; hour <= 20; hour++) {
    const displayHour = hour <= 12 ? `${hour}am` : `${hour - 12}pm`;
    tableHeader.innerHTML += `<th>${displayHour}</th>`;
  }
  
  tableHeader.innerHTML += '<th>Daily Location Total</th>';
  tableContainer.appendChild(tableHeader);
}

const locations = [
  new CookieSales('Seattle', 23, 65, 6.3),
  new CookieSales('Tokyo', 3, 24, 1.2),
  new CookieSales('Dubai', 11, 38, 3.7),
  new CookieSales('Paris', 20, 38, 2.3),
  new CookieSales('Lima', 2, 16, 4.6)
];

createHeaderRow();

locations.forEach(location => {
  location.calculateCookiePerHour();
  location.render();
});

function createFooterRow(locations) {
  const totalsRow = document.createElement('tr');
  totalsRow.innerHTML = '<th>Location</th>';
  let hourlyTotal = Array(15).fill(0);
  
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    for (let j = 0; j < 15; j++){
      hourlyTotal[j] += location.cookiePerHour[j];
    }
  }

  for (let i = 0; i < 15; i++) {
    totalsRow.innerHTML += `<td>${hourlyTotal[i]}</td>`;
  }

  tableContainer.appendChild(totalsRow)
}

  const form = document.getElementById('cookieForm');
        form.addEventListener('submit', function (e) {
          e.preventDefault();

          const locationName = document.getElementById('locationName').value;
          const minCustomers = parseInt(document.getElementById('minCustomers').value);
          const maxCustomers = parseInt(document.getElementById('maxCustomers').value);
          const avgCookies = parseFloat(document.getElementById('avgCookies').value);

          const newLocation = new CookieSales(locationName, minCustomers, maxCustomers, avgCookies);

          newLocation.calculateCookiePerHour();
          newLocation.render();

          location.push(newLocation);

          createFooterRow([...locations, newLocation]);
        });