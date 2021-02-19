const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const weatherKey = '&APPID=ea07e9e09150478becb8d938351479dd';

const gifApiUrl = 'https://api.giphy.com/v1/gifs/translate?api_key=OUN5WKMjCRqGCoBwJGnzBCnRBg14UdNN&s=';

export default (() => {
  const getGif = async (keyword) => {
    let gifUrl = null;
    try {
      const resp = await fetch(gifApiUrl + keyword, {
        mode: 'cors',
      });
      const gif = await resp.json();
      gifUrl = gif.data.images.downsized_large.url;
    } catch (error) {
      const resp = await fetch(`${gifApiUrl}404 not found`, {
        mode: 'cors',
      });
      const gif = await resp.json();
      gifUrl = gif.data.images.downsized_large.url;
    }

    return gifUrl;
  };

  const getWeather = async (city) => {
    let weatherData = null;
    try {
      const resp = await fetch(weatherUrl + city + weatherKey, {
        mode: 'cors',
      });
      const data = await resp.json();
      weatherData = {
        cityName: data.name,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        temp_min: {
          celcius: (data.main.temp_min - 273.15).toFixed(1),
          farenheit: (((data.main.temp_min - 273.15) * 9) / 5 + 32).toFixed(1),
        },
        feels_like: {
          celcius: (data.main.feels_like - 273.15).toFixed(1),
          farenheit: (((data.main.feels_like - 273.15) * 9) / 5 + 32).toFixed(
            1,
          ),
        },
        temp_max: {
          celcius: (data.main.temp_max - 273.15).toFixed(1),
          farenheit: (((data.main.temp_max - 273.15) * 9) / 5 + 32).toFixed(1),
        },
      };
    } catch (error) {
      weatherData = {
        cityName: `Whoops could not find "${city}"`,
        latitude: '...',
        longitude: '...',
        weather: '...',
        description: '...',
        temp_min: {
          celcius: '...',
          farenheit: '...',
        },
        feels_like: {
          celcius: '...',
          farenheit: '...',
        },
        temp_max: {
          celcius: '...',
          farenheit: '...',
        },
      };
    }

    return weatherData;
  };

  const getDefaultWeather = () => getWeather('Lagos');
  return {
    getDefaultWeather,
    getWeather,
    getGif,
  };
})();