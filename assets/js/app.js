/**
 * App entry point
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
