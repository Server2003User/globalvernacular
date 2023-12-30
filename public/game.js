let correctScore = 0;
let falseScore = 0;

function manyThings() {
    window.location.href = "https://manythings.lol"
}

function readSetting(setting) {
    let settingread = localStorage.getItem(setting);
    return settingread;
}

function updateScore() {
    document.getElementById("correctscore").innerText = correctScore;
    document.getElementById("falsescore").innerText = falseScore;
}

async function getCountryInfo() {
    let chosenSetting = readSetting("selectedCountries");
    console.log(chosenSetting);
    let urlChoice;
    if (chosenSetting === "ind") {
        urlChoice = "api/indCountryInfo";
    } else {
        urlChoice = "api/CountryInfo";
    }
    console.log(urlChoice);
    const response = await fetch(urlChoice);
    const countryInfo = await response.json();
    return countryInfo;
}

function clearLanguages() {
    const box = document.getElementById("languagesarea");
    const languageBoxes = box.getElementsByClassName("languagebox");

    // Remove each element with the class "languagebox"
    while (languageBoxes.length > 0) {
        box.removeChild(languageBoxes[0]);
    }
}

let currentCountryInfo = null; // Variable to store fetched country information

async function getAndDisplayCountryInfo() {
    try {
        currentCountryInfo = await getCountryInfo(); // Fetch country info
        displayLanguages(currentCountryInfo); // Pass the country info to displayLanguages()
    } catch (error) {
        console.error('Error:', error);
    }
}

getAndDisplayCountryInfo();

function clearTextBox() {
    textBox = document.getElementById("guesstextareatext");
    textBox.innerText = "";
}

async function guess() {
    try {
        if (!currentCountryInfo) {
            await getAndDisplayCountryInfo(); // Fetch country info if not already fetched
        }

        const countryName = currentCountryInfo.name;
        const userGuess = document.getElementById("guesstextareatext").innerText.trim();

        if (userGuess === countryName) {
            correctScore += 1;
        } else {
            falseScore += 1;
            const correctNation = document.createElement('div');
            const addNation = document.createTextNode(countryName);
            correctNation.appendChild(addNation);
            correctNation.setAttribute('class', "nationfalse");
            correctNation.setAttribute('id', 'nationfalse');
            document.getElementById('languagesarea').appendChild(correctNation);
        }
        clearTextBox();
        updateScore();
        clearLanguages();
        getAndDisplayCountryInfo(); // Refresh displayed languages
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayLanguages(countryInfo) {
    try {
        const countryLanguages = countryInfo.languages;
        const countryFlag = countryInfo.flag;
        // Display the flag emoji if available
        if (countryFlag) {
            const flagEmoji = document.createElement('div');
            flagEmoji.setAttribute('class', 'languagebox');
            flagEmoji.innerText = countryFlag; // Assuming countryFlag is the emoji
            document.getElementById("languagesarea").appendChild(flagEmoji);
        }
        for (let i = 0; i < countryLanguages.length; i++) {
            const createLanguage = document.createElement('div');
            const addLanguage = document.createTextNode(countryLanguages[i]);
            createLanguage.appendChild(addLanguage);
            createLanguage.setAttribute('class', "languagebox");
            createLanguage.setAttribute('id', 'languagebox' + i);
            document.getElementById("languagesarea").appendChild(createLanguage);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
