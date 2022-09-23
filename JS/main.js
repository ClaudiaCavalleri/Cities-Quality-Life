//Copyright footer with current year
const currentYear = document.querySelector("#current-year");
currentYear.innerHTML = new Date().getFullYear();


//Variable declaration
const searchIcon = document.querySelector("#search-icon");
const cityInp = document.querySelector("#city-inp");
const errorBox = document.querySelector('.error-box');
const cityTitle = document.querySelector('#cityTitle');
const intro = document.querySelector('.introduction');
const totalScore = document.querySelector('.total-score-wrapper');
const citySummary = document.querySelector('.city-summary');
const scoreWrapper = document.querySelector('.score-wrapper');


//Add website's introduction
intro.innerHTML = `
    <p>Imagine to live and work in your <strong>dream city</strong>, which one could it be?</p>

    <p>If you already don't know, let's give a look to our selection of the greatest cities in the world
        and their <strong>quality levels</strong>.
    </p>
                                
    <p>Compare <strong>life quality data</strong> for hundreds of cities worldwide
        and get a <strong>city ranking</strong> based on your <strong>personal preferences</strong>.
    </p>`
;

//Add listeners
searchIcon.addEventListener('click', getData);

cityInp.addEventListener('keydown', function(event) {                    //Keyboard event listener
    if(event.key === 'Enter') {
        getData();
        console.error();
    }
});

cityInp.addEventListener('focus', () => {
    cityInp.value = "";
    errorBox.innerHTML = "";
})


//Fetch API function
async function getData() {
    const cityName = correctName(cityInp.value);
    
    const finalURL = `https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`;
    const response = await fetch(finalURL);
    const data = await response.json();
    console.log(finalURL);

    const imageURL = `https://api.teleport.org/api/urban_areas/slug:${cityName}/images/`;
    const response2 = await fetch(imageURL);
    const data2 = await response2.json();
    

    if(response.status !== 404) {
    cityInp.value = "";
    cityTitle.value = "";
    intro.innerHTML = "";
 
    let capitalizedName = cityName.toUpperCase().replaceAll("-", " ");
    cityTitle.innerHTML = `${capitalizedName}`;

    //Insert data into html
    totalScore.innerHTML = `<h2><b>City score</b>: ${(data.teleport_city_score).toFixed(2)} / 100</h2>`
    totalScore.style.borderBottom = "2px solid var(--turquoise)";

    citySummary.innerHTML = "";
    citySummary.innerHTML = `<h2>Summary: </h2><p>${data.summary}</p>`;
    citySummary.style.borderBottom = "2px solid var(--turquoise)";

    data.categories.forEach((e) => {
        scoreWrapper.insertAdjacentHTML("afterbegin", `<h2><b>${e.name}</b>: ${(e.score_out_of_10).toFixed(2)} / 10</h2>`);
    });

    h2.setAttribute("style", `color: ${data.categories.color};`);
    
    const headerBackground = document.querySelector('header');
    headerBackground.style.backgroundImage = `url(${data2.photos[0].image.web})`;
    
    }
    else {
        getError();
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
function getError(){
    if(cityInp.length == 0) {
        errorBox.innerHTML = `<p>The input field cannot be empty!</p>`;
    }
    else {
        errorBox.innerHTML = `<p>Please, enter a valid city name.</p>`;
    }; 
}








/*
searchIcon.addEventListener("click", () => {
    let cityName = correctName(cityInp.value);
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`;
    console.log(finalURL);

    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {

            result.insertAdjacentHTML("afterbegin", `

                <h2>${cityName}</h2>
                <div class="wrapper">
                    <div class="data-wrapper" id="wrapper-city-score">
                        <h3>City score: </h3>
                        <p>${data.teleport_city_score} / 100</p> 
                    </div>
                </div>

                <div class="wrapper">
                    <div class="data-wrapper">
                        <h3>Summary:</h3>
                        <p>${data.summary}</p>
                    </div>
                    <div class="data-wrapper" id="wrapper-city-housing">
                        <h3>${data.categories[Object.keys(data.categories)[0]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[0]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-cost-of-living">
                        <h3>${data.categories[Object.keys(data.categories)[1]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[1]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-startups">
                        <h3>${data.categories[Object.keys(data.categories)[2]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[2]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-venture-capital">
                        <h3>${data.categories[Object.keys(data.categories)[3]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[3]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-travel-connectivity">
                        <h3>${data.categories[Object.keys(data.categories)[4]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[14]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-commute">
                        <h3>${data.categories[Object.keys(data.categories)[5]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[5]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-business-freedom">
                        <h3>${data.categories[Object.keys(data.categories)[6]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[6]].score_out_of_10} / 10</p>
                    </div>
               
                    <div class="data-wrapper" id="wrapper-city-safety">
                        <h3>${data.categories[Object.keys(data.categories)[7]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[7]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-healthcare">
                        <h3>${data.categories[Object.keys(data.categories)[8]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[8]].score_out_of_10} / 10</p>
                    </div>
               
                    <div class="data-wrapper" id="wrapper-city-education">
                        <h3>${data.categories[Object.keys(data.categories)[9]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[9]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-environmental-quality">
                        <h3>${data.categories[Object.keys(data.categories)[10]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[10]].score_out_of_10} / 10</p>
                    </div>
               
                    <div class="data-wrapper" id="wrapper-city-economy">
                        <h3>${data.categories[Object.keys(data.categories)[11]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[11]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-taxation">
                        <h3>${data.categories[Object.keys(data.categories)[12]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[12]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-internet-access">
                        <h3>${data.categories[Object.keys(data.categories)[13]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[13]].score_out_of_10} / 10</p>
                    </div>
               
                    <div class="data-wrapper" id="wrapper-city-leisure-culture">
                        <h3>${data.categories[Object.keys(data.categories)[14]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[14]].score_out_of_10} / 10</p>
                    </div>
                
                    <div class="data-wrapper" id="wrapper-city-tolerance">
                        <h3>${data.categories[Object.keys(data.categories)[15]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[15]].score_out_of_10} / 10</p>
                    </div>
               
                    <div class="data-wrapper" id="wrapper-city-outdoors">
                        <h3>${data.categories[Object.keys(data.categories)[16]].name}: </h3>
                        <p>${data.categories[Object.keys(data.categories)[16]].score_out_of_10} / 10</p>
                    </div>
                </div>`
            ) 
            cityInp.value = "";
            citySummary.remove();
        })
        .catch(() => {
            if(cityName.length == 0) {
                result.innerHTML = `<h4>The input field cannot be empty!</h4>`;
            }
            else {
                result.innerHTML = `<h4>Please, enter a valid city name.</h4>`;
            };
        });
});
*/













