/**
 * WeatherApp Plugin - a jquery plugin
 */

$.fn.weatherapp = function(options){

    // initial fixed values (cache values)
    var btnShowWeatherClass = '.weatherapp-show-weather';

    this.each(function(){

        // initial not fixed values (cache values)
        var cityBtn_ = $(this).find( btnShowWeatherClass );

        // plugin default options
        var defaults = {
            // url to make calls
            urlBase: 'http://api.openweathermap.org/data/2.5/weather',

            // appid needed to make calls to api
            appId: '95a39919ee05fc2a69ca1b39ee81e22e',

            // div containing the city and the needed structure inside it
            cityWrap: $(this),

            // button to be clicked inside the div that contains all the city info
            cityBtn: cityBtn_,

            // city id on openweather
            cityId: cityBtn_.data('cityid'),

            // city name on openweather
            cityName: cityBtn_.data('cityname'),

            // search by city id ('cityId') or by city name ('cityName')
            searchBy: 'cityId',

            // event to listen when clicked button to see the weather inside a city wrap
            ev_click_vertiempo: 'click.weatherapp'
        };

        // creates DOM elements with ajax response, public
        defaults.renderWeatherCreateDOM = function( res ){
            // dom elements
            var container = $('<div>', {
                'class': 'weatherapp-res-cont-' + res.name,
            });

            var parag = $('<p>', {
                'class': 'text-right'
            });

            var msg = '<b>Main weather</b>: ' + res.weather[0].main + ' ('+ res.weather[0].description +')';
            msg += '<br/> <b>Temperature</b>: ' + res.main.temp;
            msg += '<br/> <b>Wind</b>: ' + res.wind.speed;

            // create dom tree
            parag.html( msg )
            container.append( parag );

            return container;
        };

        // final settings
        var settings = $.extend( defaults, options);

        // prints the weather on screen, private
        settings.renderWeather = function( res ){

            var container = settings.renderWeatherCreateDOM( res );

            return container;
        };

        // shows the actual weather, private
        settings.showWeather = function(){

            // depending on city identification base
            var apiUrl = settings.urlBase + '?' + 'appid=' + settings.appId;
            if (settings.searchBy === 'cityId') {
                apiUrl += '&' + 'id=' + settings.cityId;
            } else if (settings.searchBy === 'cityName') {
                apiUrl += '&' + 'q=' + settings.cityName;
            }

            // get info ajax
            settings.getInfoPrint( apiUrl );
        };

        // makes ajax call and prints info, private
        settings.getInfoPrint = function( apiUrl ){
            $.ajax({
                url : apiUrl,
                method: "GET",
                dataType: "jsonp",
                success: function(res){

                    // hide button
                    settings.cityBtn.hide();

                    // show info
                    var weatherDom = settings.renderWeather( res );
                    settings.cityWrap.append( weatherDom );

                    // detach event handler on that city button once it is clicked
                    settings.cityWrap.off( settings.ev_click_vertiempo, settings.showWeather );
                },
                error: function(request, errorType, errorMessage){
                    alert('Error: '+ errorType +' with: '+ errorMessage);
                },
                beforeSend: function(){
                    console.log('--- before...');
                },
                complete: function(){
                    console.log('+++ complete...');
                }
            });
        };

        // event handlers
        settings.cityWrap.on( settings.ev_click_vertiempo, settings.cityBtn, settings.showWeather);
    });
};
