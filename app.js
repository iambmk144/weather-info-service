const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Replace with your WeatherStack API key
const apiKey = '897512345f310f2382d2e1064f52cbf1';

// Route to fetch weather data
app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).send({ error: 'Please provide a city name' });
  }

  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    if (weatherData.error) {
      return res.status(404).send({ error: 'City not found' });
    }

    res.send({
      location: weatherData.location.name,
      temperature: weatherData.current.temperature,
      weather_descriptions: weatherData.current.weather_descriptions[0],
      humidity: weatherData.current.humidity,
      wind_speed: weatherData.current.wind_speed,
    });
  } catch (error) {
    res.status(500).send({ error: 'Unable to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
