/**
 * App entry point
 */

$.fn.weatherapp = function(options){

    this.each(function(){

        // final settings
        var settings = $.extend({
            urlBase: 'http://api.openweathermap.org/data/2.5/weather',
            appId: '95a39919ee05fc2a69ca1b39ee81e22e',
            cityWrap: $(this),
            cityBtn: $(this).find('.weatherapp-show-weather'),
            cityId: $(this).find('.weatherapp-show-weather').data('cityid'),
            // prints the weather on screen
            renderWeather: function( res ){

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
            }
        }, options);

        // shows the actual weather
        var showWeather = function(){
            var apiUrl = settings.urlBase + '?' + 'appid=' + settings.appId + '&' + 'id=' + settings.cityId;
            console.log('apiurl: ', apiUrl);

            // get info ajax
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
        settings.cityWrap.on('click.weatherapp', settings.cityBtn, showWeather);
    });
};


$(document).ready(function(){

    // override default settings
    var options = {}

    // call plugin on all city containers
    $('.weatherapp-city-wrap').weatherapp(options);

});
