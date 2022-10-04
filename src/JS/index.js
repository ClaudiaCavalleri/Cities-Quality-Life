
//Variable declaration
const searchIcon = document.querySelector("#search-icon");
const cityInp = document.querySelector("#city-inp");
const errorBox = document.querySelector('.error-box');
const cityTitle = document.querySelector('#cityTitle');
const intro = document.querySelector('.introduction');
const totalScore = document.querySelector('.total-score-wrapper');
const citySummary = document.querySelector('.city-summary');
const scoreWrapper = document.querySelector('.score-wrapper');
let cityName;
const hintsContaner = document.querySelector('.hints-container');

    

async function getData() {  
    
    //Fetch API 
    const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`);
    const data = await response.json();

    const response2 = await fetch(`https://api.teleport.org/api/urban_areas/slug:${cityName}/images/`);
    const data2 = await response2.json();
    console.log(`https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`);

    if(response.status !== 404) {
    
        //Insert data into html
        cityInp.value = "";
        cityTitle.value = "";
        intro.innerHTML = "";

        let capitalizedName = cityName.toUpperCase().replaceAll("-", " ");
        cityTitle.innerHTML = `${capitalizedName}`;

        totalScore.innerHTML = `<h2><strong>City score</strong>: ${(data.teleport_city_score).toFixed(2)} / 100</h2>`
        totalScore.style.borderBottom = "2px solid var(--turquoise)";

        citySummary.innerHTML = "";
        citySummary.innerHTML = `<h2><strong>Summary</strong>: </h2><p>${data.summary}</p>`;
        citySummary.style.borderBottom = "2px solid var(--turquoise)";

        scoreWrapper.innerHTML = "";
        data.categories.forEach((e) => {
            scoreWrapper.insertAdjacentHTML("afterbegin", `<h2><strong>${e.name}</strong>: ${(e.score_out_of_10).toFixed(2)} / 10</h2>`);
        });

        const headerBackground = document.querySelector('header');
        headerBackground.style.backgroundImage = `url(${data2.photos[0].image.web})`;
        
    }
    else {
        getError('This city is not available, please try again or use english names.');
    }   
} 


//Function to handle the typo/input errors
function correctName(input){
    input = input.toLowerCase();
    input = input.trim();
    input = input.replaceAll(" ","-");
    return input;
};  


//Error function
function getError(errorMessage){
    errorBox.innerHTML = `<p>${errorMessage}</p>`; 
    return errorMessage;
}

//Add listeners
searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    if(cityInp.value == ""){
        getError('The input field cannot be empty!');
    }
    else {
        cityName = correctName(cityInp.value);
        getData();
    }
});

cityInp.addEventListener('keydown', function(event) {                 
    if(event.key === 'Enter') {
        event.preventDefault();
        cityName = correctName(cityInp.value);
        getData();
    }
});

cityInp.addEventListener('focus', () => {
    cityInp.value = "";
    errorBox.innerHTML = "";
})

/*let citiesList = [];
let items = "ua:item";
async function downloadCities(){
    const download = await fetch(`https://api.teleport.org/api/urban_areas/`);
    let data = await download.json(); 
    //citiesList = await _.get(download, "data._links.ua:item")
    //citiesList = [data._links.ua:items.names];
    citiesList = ['London', 'Rome', 'Milan', 'Miami', 'Amsterdam', 'Berlin', 'Brasilia', 'Madrid', 'Rio de Janeiro', 'New York'];
    console.log(citiesList);
    //console.log(data._links.item.names);
    console.log(`https://api.teleport.org/api/urban_areas/`);

   
}
downloadCities();
citiesList = ['London', 'Rome', 'Milan', 'Miami', 'Amsterdam', 'Berlin', 'Brasilia', 'Madrid', 'Rio de Janeiro', 'New York'];
*/










