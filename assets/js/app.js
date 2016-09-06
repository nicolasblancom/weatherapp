/**
 * App entry point
 */

$(document).ready(function(){

    // div containing the city and the needed structure inside it
    var cityWrap = $( '.weatherapp-city-wrap' );

    // override default settings
    var options = {
        appId: '95a39919ee05fc2a69ca1b39ee81e22e',
        searchBy: 'cityName'
    };

    // call plugin on all city containers
    cityWrap.weatherapp(options);

});
