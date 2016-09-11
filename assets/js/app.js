/**
 * App entry point
 *
 * Usage:
 * - Choose a css class name for the city wrapper in your html. In this example the css class is '.weather-city-wrap'
 * - Provide required plugin option 'appId', and optional plugin options 'searchBy' and 'renderWeatherCreateDOM'
 * - Call weatherapp() function on your city wrapper element and pass your overriden options to it as argument
 * 
 */

$(document).ready(function(){

    // div containing the city and the needed structure inside it
    var cityWrap = $( '.weatherapp-city-wrap' );

    // override default settings
    var options = {
        appId: '95a39919ee05fc2a69ca1b39ee81e22e',
        searchBy: 'cityName',
        renderWeatherCreateDOM: function( res ){
            // dom elements
            var container = $('<div>', {
                'class': 'weatherapp-res-cont-' + res.name,
            });

            var parag = $('<p>', {
                'class': 'text-right'
            });

            var msg = '';
            msg += '<b class="text-info">' + res.weather[0].description + '</b><br/>';
            msg += '<span>' + res.main.temp + ' (ºC)</span> - ';
            msg += '<span>' + res.wind.speed + ' (m/s)</span>';

            // create dom tree
            parag.html( msg )
            container.append( parag );

            return container;
        }
    };

    // call plugin on all city containers
    cityWrap.weatherapp(options);

});
