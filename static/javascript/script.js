// Car Make
let selectCarMakeDiv = document.querySelector("#car-make-div");
let selectCarMakeOptionsDiv = document.querySelector(".car-make-options");
let carMakeLabel = document.querySelector("#car-make-label");

// Car Model
let selectCarModelDiv = document.querySelector("#car-model-div");
let selectCarModelOptionsDiv = document.querySelector(".car-model-options");
let carModelLabel = document.querySelector("#car-model-label");

// Car year
let selectCarYearDiv = document.querySelector("#car-year-div");
let selectCarYearOptionsDiv = document.querySelector(".car-year-options");
let carYearLabel = document.querySelector("#car-year-label");

// Estimate Button
getEstimateButton = document.querySelector(".get-estimate-btn");

// hidden form
const hiddenForm = document.querySelector("#hidden-form");

var carModelNames = [];

// API call display car make
const API_KEY = '0da6700346msh27f8c33ac7f438cp1c33cajsn6337f1937014';
const makeURL = 'https://car-api2.p.rapidapi.com/api/makes?sort=id&direction=asc';
const headers = new Headers({
    'X-RapidAPI-Key': API_KEY,
    'Accept': 'application/json',
});
async function fetchDataFromAPI(url, headers) {
    const request = new Request(url, {
        method: 'GET',
        headers: headers,
    });

    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        return data['data'];
    } catch (error) {
        console.error(error);
        return [];
    }
}
async function fetchDataAndProcess() {
    try {
        let makeData = await fetchDataFromAPI(makeURL, headers);
        if (makeData) {
            makeName = makeData.map(car => car.name);
            makeName = set(makeName)
        }
    } catch (error) {
        console.error(error);
    }
}

fetchDataAndProcess();

// Car Make Div
selectCarMakeDiv.addEventListener("click", () => {
    makeName.forEach(car => {
        const aTag = document.createElement('a');
        aTag.className = 'dropdown-option';
        aTag.href = 'javascript:void(0)';
        aTag.textContent = car;
        selectCarMakeOptionsDiv.appendChild(aTag);
    });
    selectCarMakeOptionsDiv.classList.toggle('active');
    selectCarMakeOptionsDiv.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            carModelLabel.innerHTML = "Select Model"
            let carMakeClicked = event.target.textContent;
            carMakeLabel.innerHTML = carMakeClicked;
            hiddenForm.querySelector('input[name="make"]').value = carMakeClicked;
            selectCarMakeOptionsDiv.classList.remove('active');
            selectCarModelDiv.removeAttribute("disabled");
            selectCarModelOptionsDiv.classList.remove('active');
            // API call display car models
            const modelURL = `https://car-api2.p.rapidapi.com/api/models?year=2015&year=2016&year=2017&year=2018&year=2019&year=2020&make=${carMakeClicked}&verbose=yes`
            async function fetchDataAndProcess() {
                try {
                    let modelData = await fetchDataFromAPI(modelURL, headers);
                    if (modelData) {
                        carModelNames = modelData.map(carModel => carModel.name);
                        carModelNames = set(carModelNames)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            fetchDataAndProcess();
        }
    });
});
// Car Model
selectCarModelDiv.addEventListener("click", () => {
    selectCarModelOptionsDiv.innerText = '';
    carModelNames.forEach(car => {
        const aTag = document.createElement('a');
        aTag.className = 'dropdown-option';
        aTag.href = 'javascript:void(0)';
        aTag.textContent = car;
        selectCarModelOptionsDiv.appendChild(aTag);
    });

    selectCarModelOptionsDiv.classList.toggle('active');
    selectCarModelOptionsDiv.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            carModelClicked = event.target.textContent;
            carYearLabel.innerHTML = "Select Year"
            carModelLabel.innerHTML = carModelClicked;
            hiddenForm.querySelector('input[name="model"]').value = carModelClicked;
            selectCarModelOptionsDiv.classList.remove('active');
            selectCarYearDiv.removeAttribute("disabled");
        }
    });
});

// Car Year
selectCarYearDiv.addEventListener("click", () => {
    selectCarYearOptionsDiv.classList.toggle('active');
    selectCarYearOptionsDiv.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            carYearClicked = event.target.textContent;
            carYearLabel.innerHTML = carYearClicked;
            hiddenForm.querySelector('input[name="year"]').value = carYearClicked;
            selectCarYearOptionsDiv.classList.remove('active');
            getEstimateButton.removeAttribute('disabled');
        }
    });
});

// Submit Home Page
getEstimateButton.addEventListener("click", () => {
    hiddenForm.submit();
})

// Display Date
const currentYear = new Date().getFullYear();
yearDiv = document.querySelector('.car-year-options');

for (let index = currentYear; index >= currentYear - 19; index--) {
    const aTag = document.createElement('a');
    aTag.className = 'dropdown-option';
    aTag.href = 'javascript:void(0)';
    aTag.textContent = index;
    yearDiv.appendChild(aTag);
}