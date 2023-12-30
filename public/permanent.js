function saveSetting(setting, attribute) {
    localStorage.setItem(setting, attribute);
}

function readSetting(setting) {
    let settingread = localStorage.getItem(setting);
    return settingread;
}

function saveSetting(setting, attribute) {
    localStorage.setItem(setting, attribute);
}

function readSetting(setting) {
    let settingread = localStorage.getItem(setting);
    return settingread;
}

function keepPermanent() {
    var select = document.getElementById("selectCountries");

    // Check if there's a previously selected value stored in localStorage
    var savedValue = readSetting("selectedCountries");

    if (savedValue) {
        // Set the selected option to the value retrieved from localStorage
        select.value = savedValue;
    }

    // Listen for changes in the select element and save the selected value to localStorage
    select.addEventListener("change", function() {
        saveSetting("selectedCountries", select.value);
    })
}

keepPermanent();