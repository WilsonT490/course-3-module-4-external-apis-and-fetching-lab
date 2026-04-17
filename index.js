// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

// Select elements (match your HTML)
const input = document.getElementById('state-input');
const button = document.getElementById('fetch-alerts');
const result = document.getElementById('alerts-display');
const errorDiv = document.getElementById('error-message');

// Fetch function
async function fetchWeatherData(state) {
  try {
    // Clear previous content
    result.textContent = '';
    errorDiv.textContent = '';

    // Validate input
    if (!state) {
      throw new Error('Please enter a state abbreviation');
    }

    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

    if (!response.ok) {
      throw new Error('Failed to fetch weather alerts');
    }

    const data = await response.json();

    displayWeather(data);

    // Clear input after success
    input.value = '';

  } catch (error) {
    displayError(error.message);
  }
}

// Display alerts
function displayWeather(data) {
  const alerts = data.features;

  result.textContent =
    `Current watches, warnings, and advisories for ${data.title.split('for ')[1]}: ${alerts.length}`;

  alerts.forEach(alert => {
    const p = document.createElement('p');
    p.textContent = alert.properties.headline;
    result.appendChild(p);
  });
}

// Display error
function displayError(message) {
  errorDiv.textContent = message;
}

// Button click
button.addEventListener('click', () => {
  const state = input.value.trim();
  fetchWeatherData(state);
});

// Export for tests
module.exports = {
  fetchWeatherData,
  displayWeather,
  displayError
};