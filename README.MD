# Weather App

This is a test code for a small jQuery plugin...

It will fetch the weather data using the OpenWeatherMap.org API by ajax functions and print out some weather info.

You only need to load the plugin, add some required markup, specify the cities in the markup and start the plugin.

The idea is to have every city under a wrapper (in the markup) with all its info inside, so the plugin will print the weather info inside this container. You can add as many city wrappers as needed.

## Usage

This project has an entire html page code, but you just need `/assets/js/weatherapp-plugin.js` (this is the plugin).
This is a jQuery plugin so be sure to have jQuery added to your page and that it's loading before the plugin file.

Then you will need to add some markup, and define some plugin options.

Finally you will need to have an OpenWeatherMap.org account, in order to have an app ID to use their API ([Create the account here](https://home.openweathermap.org/users/sign_up) and under API keys tab, you can generate one). It's free and it won't work until you provide a valid value.

[Cities ID and Name can be found here](http://bulk.openweathermap.org/sample/) under city.list.json.gz. This info is needed to add the markup of the cities and their data.

#### Use only the plugin file
- Add the plugin file (weatherpp-plugin.js) after the jQuery library file in your html file
- **Needed markup**: this plugin basically grabs the information about the city we want to know the weather, by searching for it inside a tag (could be anything you want) that wraps all the city itself and writing the result also inside this tag
    + **Create a wrapper for every city:** in your index.html, add for example a div with the class `.weatherapp-city-wrap` so the plugin can find it. You will have to specify this in you js file later.
    + **Create city info container inside the city wrapper:** you need a tag that will contain the city info to make the request. This tag could be a simple `<input type="hidden">` if you don't want any button to be present. In the demo, I used a `<button>` tag with some text.
        * It needs to have the class `.weatherapp-show-weather` in order to let the plugin find this data.
        * Add the attribute `data-cityId` for the city ID, and `data-cityName` for the city name. Both are used to identificate the city, depending on what you specify in the plugin options.
    + MARKUP EXAMPLE:

    ```html
    <div class="weatherapp-city-wrap">
        <h2>City Name here...</h2>
        <p>Some text here...</p>

        <!-- depending on what value you give to 'searchBy' plugin option in next step, add dara-CityId or data-CityName. Only one is needed. -->
        <button type="button" role="button" class="weatherapp-show-weather" data-cityId="6359304" data-cityName="Madrid,ES">
            get the weather
        </button>
    </div>
    ```

- **your js file:** Inside your main js file, you just need to call `.weatherapp()` plugin function on the element that wrap each of your cities ('.weatherapp-city-wrap' if you followed the instructions step by step).
    + **You can override some default options.** The only one required is `appId`. Just create a JSON Object and override the values:
        * `appId`: your OpenWeatherMap app ID (API key). This is required.
        * `searchBy`: This is optional. Two possible values `cityName` or `cityId`. Depending on what data you prefer to add to your markup.
        * `renderWeatherCreateDOM`: This is optional. It's a function you pass to the plugin. It will return the HTML you want to print out, so you can customize the output. See example below, and pay attention to variable names, those are the default response of openweathermap.
    + JS FILE EXAMPLE:

    ```javascript
    $(document).ready(function(){

        // element containing the city and the needed structure inside it, choose whatever class name you want
        var cityWrap = $( '.weatherapp-city-wrap' );

        // override default settings
        var options = {

            // API key
            appId: '95a39919ee05fc2a69ca1b39ee81e22e',

            // 'cityName' or 'cityID'
            searchBy: 'cityName',

            // custom function to customize the output, it must return the HTML
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

        // call plugin on all city containers and pass the overriden options
        cityWrap.weatherapp(options);
    });
    ```

#### Or use the entire repo and modify it
You can download the entire repo and modify what you need from it

[WeatherApp Page](http://nicolasblancom.com/weatherapp-jquery-plugin)
