import _ from 'lodash';
import { CityData } from './city';


class PincoPallino {
    constructor(){
        this.searchIcon = document.querySelector("#search-icon");
        this.cityInp = document.querySelector("#city-inp");
        this.errorBox = document.querySelector('.error-box');
        this.cityTitle = document.querySelector('#cityTitle');
        this.intro = document.querySelector('.introduction');
        this.totalScore = document.querySelector('.total-score-wrapper');
        this.citySummary = document.querySelector('.city-summary');
        this.scoreWrapper = document.querySelector('.score-wrapper');

    }
    showResults(){
        //cancello l'input 
        this.cityInp.value = "";

        //cancello l'errore
        this.errorBox.value = "";

        //modifico nome città per inserirlo nella pagina html
        let title = _.get()
        this.cityTitle
    }





}



