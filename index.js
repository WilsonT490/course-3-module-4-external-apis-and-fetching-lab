// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

// Select elements
const input = document.getElementById('state-input');
const button = document.getElementById('fetch-alerts');
const result = document.getElementById('alerts-display');
const errorDiv = document.getElementById('error-message');

// Fetch function
async function fetchWeatherData(state) {
  try {
    // Clear previous results
    result.textContent = '';

    // Hide error
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');

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

    // Clear input
    input.value = '';

  } catch (error) {
    displayError(error.message);
  }
}

// Display alerts
function displayWeather(data) {
  const alerts = data.features;

  // ✅ EXACT format required by tests
  result.textContent = `Weather Alerts: ${alerts.length}`;

  alerts.forEach(alert => {
    const p = document.createElement('p');
    p.textContent = alert.properties.headline;
    result.appendChild(p);
  });
}

// Display error
function displayError(message) {
  errorDiv.textContent = message;

  // ✅ SHOW error (remove hidden)
  errorDiv.classList.remove('hidden');
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
