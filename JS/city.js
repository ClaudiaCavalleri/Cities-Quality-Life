import axios from 'axios';
import _ from 'lodash';


export class CityData {
    constructor(city) {
        this.city = city;
    
    }


    async  getDATA() {
        //const cityNAME = this.city.toLowerCase().trim().replaceAll(" ", "-");

        const responseCity = await axios.get(`https://api.teleport.org/api/urban_areas/slug:${cityNAME}/scores/`);

        const citySUMMARY = _.get(responseCity, 'data.summary');
        const cityCATEGORIES = _.get(responseCity, 'data.categories');
        const cityTOTALSCORE = _.get(responseCity, 'data.teleport_city_score');

        const responseIMG = await axios.get(`https://api.teleport.org/api/urban_areas/slug:${cityNAME}/images/`);

        const cityIMG = _.get(responseIMG, 'data.photos[0].image.web');

        return {
            cityNAME,
            cityCATEGORIES,
            citySUMMARY,
            cityTOTALSCORE,
            cityIMG
        }
    }
}
