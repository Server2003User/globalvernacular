// Import 'easy-emojis' using CommonJS require
const easyEmojis = require('easy-emojis');
const fetch = require('node-fetch');

// Function to retrieve country information
async function getCountryInfo() {
    try {
        const apiLink = "https://restcountries.com/v3.1/all/";
        const response = await fetch(apiLink);
        const apiData = await response.json();
        
        const randomNumber = getRandomNumber(Object.keys(apiData).length);
        const selectedCountry = apiData[randomNumber];
        const countryName = selectedCountry.name.common;

        let countryLanguages = [];
        if (Array.isArray(selectedCountry.languages)) {
            countryLanguages = selectedCountry.languages;
        } else if (typeof selectedCountry.languages === 'object') {
            countryLanguages = Object.values(selectedCountry.languages);
        }

        const countryFlag = easyEmojis.countryCodeToFlag(selectedCountry.cca2);

        return { name: countryName, languages: countryLanguages, flag: countryFlag };
    } catch (error) {
        console.error("Error fetching country information:", error);
        return null; // Handle the error accordingly
    }
}

async function getIndCountryInfo() {
    try {
        const apiLink = "https://restcountries.com/v3.1/independent?status=true";
        const response = await fetch(apiLink);
        const apiData = await response.json();
        
        const randomNumber = getRandomNumber(Object.keys(apiData).length);
        const selectedCountry = apiData[randomNumber];
        const countryName = selectedCountry.name.common;

        let countryLanguages = [];
        if (Array.isArray(selectedCountry.languages)) {
            countryLanguages = selectedCountry.languages;
        } else if (typeof selectedCountry.languages === 'object') {
            countryLanguages = Object.values(selectedCountry.languages);
        }

        const countryFlag = easyEmojis.countryCodeToFlag(selectedCountry.cca2);

        return { name: countryName, languages: countryLanguages, flag: countryFlag };
    } catch (error) {
        console.error("Error fetching country information:", error);
        return null; // Handle the error accordingly
    }
}

// Function to generate random number
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    getCountryInfo, getIndCountryInfo
};