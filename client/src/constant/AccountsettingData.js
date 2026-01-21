const countryToTimezone = {
    "Bangladesh": "Asia/Dhaka",
    "India": "Asia/Kolkata",
    "USA": "America/New_York", // Could be others like America/Los_Angeles
    "UK": "Europe/London",
    "Canada": "America/Toronto", // Also could be America/Vancouver
    "Germany": "Europe/Berlin",
    "France": "Europe/Paris",
    "Italy": "Europe/Rome",
    "Spain": "Europe/Madrid",
    "Nepal": "Asia/Kathmandu",
    "Sri Lanka": "Asia/Colombo",
    "Pakistan": "Asia/Karachi",
    "Afghanistan": "Asia/Kabul"
};

export const data = [
    "Bangladesh", "India", "USA", "UK", "Canada", "Germany", "France", "Italy",
    "Spain", "Nepal", "Sri Lanka", "Pakistan", "Afghanistan"
].map(country => countryToTimezone[country]);


const countryToCurrency = {
    "Bangladesh": "BDT (Bangladeshi Taka)",
    "India": "INR (Indian Rupee)",
    "USA": "USD (United States Dollar)",
    "UK": "GBP (British Pound)",
    "Canada": "CAD (Canadian Dollar)",
    "Germany": "EUR (Euro)",
    "France": "EUR (Euro)",
    "Italy": "EUR (Euro)",
    "Spain": "EUR (Euro)",
    "Nepal": "NPR (Nepalese Rupee)",
    "Sri Lanka": "LKR (Sri Lankan Rupee)",
    "Pakistan": "PKR (Pakistani Rupee)",
    "Afghanistan": "AFN (Afghan Afghani)"
};

export const CurrencyData = [
    "Bangladesh", "India", "USA", "UK", "Canada", "Germany", "France", "Italy",
    "Spain", "Nepal", "Sri Lanka", "Pakistan", "Afghanistan"
].map(country => countryToCurrency[country]);
