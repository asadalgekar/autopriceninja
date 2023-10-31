selectTrimDiv = document.querySelector(".trim-info");
selectTrimOptions = document.querySelector(".select-trim-options");
selectTrimLabel = document.querySelector(".car-trim-label");

selectTrimDiv.addEventListener("click", () => {
    selectTrimOptions.classList.toggle("active")
    selectTrimOptions.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            let clickedOptionText = event.target.textContent;
            selectTrimLabel.innerHTML = clickedOptionText;
        }
    });
})

// Final Price
const resultContainer = document.querySelector('#result-container');
const odometerInput = document.querySelector('#odometer');

// Validate odemeter numeric input
odometerInput.addEventListener('input', function(e) {
    // Get the input value
    const inputValue = e.target.value;

    //  replace any non-numeric characters with an empty string
    const numericInput = inputValue.replace(/[^0-9]/g, '');

    // Set the input value to the numeric-only value
    e.target.value = numericInput;
});
// Extract make,model,year
let vehicleInfo = document.querySelector('#vehicle-info');
let vehicleInfoText = vehicleInfo.textContent;
let parts = vehicleInfoText.split(" ");
let year = parts[0];
let make = parts[1];
let model = parts.slice(2).join(" ");

odometerInput.addEventListener('change', () => {
    const odometerValue = odometerInput.value;

    fetch(`/get_data_from_flask?odometer=${odometerValue}&make=${make}&model=${model}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            let fairPrice = data.fair_price.toLocaleString("en-US", { style: "currency", currency: "USD" });
            let goodPrice = data.good_price.toLocaleString("en-US", { style: "currency", currency: "USD" });
            let excellentPrice = data.excellent_price.toLocaleString("en-US", { style: "currency", currency: "USD" });
            document.getElementById('condition-fair').innerHTML = fairPrice;
            document.getElementById('condition-good').innerHTML = goodPrice;
            document.getElementById('condition-excellent').innerHTML = excellentPrice;
        })
        .catch(error => console.error('Error:', error));
});