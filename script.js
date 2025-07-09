// Step 1: Function to fetch weather data
async function fetchWeatherData(location, unit = 'metric') {
  const apiKey = 'E3H4RB6JLHKD95Z5P7H53K7UC'; 
  const endpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Location not found');

    const data = await response.json();
    console.log('Weather Data:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Step 2: Extract useful data
function processWeatherData(data) {
  const today = data.days[0];
  return {
    location: data.resolvedAddress,
    date: today.datetime,
    condition: today.conditions,
    temperature: today.temp,
    icon: today.icon
  };
}

// Step 3: Form submit handler
document.getElementById('locationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = document.getElementById('locationInput').value;
  const unit = document.getElementById('unitSelect').value;

  document.getElementById('loading').style.display = 'block';

  try {
    const rawData = await fetchWeatherData(location, unit);
    if (!rawData) throw new Error('No weather data returned.');

    const processed = processWeatherData(rawData);
    await displayWeather(processed, unit); 
  } catch (err) {
    alert('Failed to get weather data.');
    console.error(err);
  } finally {
    document.getElementById('loading').style.display = 'none';
  }
});

// Step 4: Display weather and change background + show GIF
async function displayWeather(data, unit = 'metric') {
  const display = document.getElementById('weatherDisplay');
  const symbol = unit === 'us' ? '°F' : '°C';
  const condition = data.condition.toLowerCase();

  // 🔧 Reset body classes
  document.body.className = '';

  // 🔧 Set weather-specific class
  if (condition.includes('sun') || condition.includes('clear')) {
    document.body.classList.add('sunny');
  } else if (condition.includes('rain')) {
    document.body.classList.add('rain');
  } else if (condition.includes('cloud')) {
    document.body.classList.add('cloudy');
  } else if (condition.includes('snow')) {
    document.body.classList.add('snow');
  } else {
    document.body.classList.add('default');
  }

  // 🔧 Fetch GIF and render it
  const gifUrl = await fetchWeatherGif(data.condition);

  display.innerHTML = `
    <h2>Weather in ${data.location}</h2>
    <p>Date: ${data.date}</p>
    <p>Condition: ${data.condition}</p>
    <p>Temperature: ${data.temperature}${symbol}</p>
    <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${data.icon}.png" alt="${data.condition}" width="100">
    ${gifUrl ? `<img src="${gifUrl}" alt="${data.condition} gif" width="300">` : '<p>No GIF found.</p>'}
  `;
}

// Step 5: Fetch weather GIF
async function fetchWeatherGif(condition) {
  const apiKey = '3x8RfGjvD0pdFfqmpbH7Z6Fer3ZCgYHF';
  const query = encodeURIComponent(condition + ' weather');
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const gifUrl = data.data[0]?.images?.downsized?.url;
    console.log('GIF URL:', gifUrl); 
    return gifUrl;
  } catch (error) {
    console.error('Error fetching GIF:', error);
    return null;
  }
}
