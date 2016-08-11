/**
 * App entry point
 */

$(document).ready(function(){

    // override default settings
    var options = {};

    // call plugin on all city containers
    $('.weatherapp-city-wrap').weatherapp(options);

});
