/**
 * App entry point
 */

$(document).ready(function(){

    // div containing the city and the needed structure inside it
    var cityWrap = $( '.weatherapp-city-wrap' );

    // override default settings
    var options = {};

    // call plugin on all city containers
    cityWrap.weatherapp(options);

});
