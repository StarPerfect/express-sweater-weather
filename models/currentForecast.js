class currentForecast {
    constructor(location, details) {
        this.location = location;
        this.currently = {
            summary: details['currently']['summary'],
            icon: details.currently.icon,
            precipIntensity: details.currently.precipIntensity,
            precipProbability: details.currently.precipProbability,
            temperature: details.currently.temperature,
            humidity: details.currently.humidity,
            pressure: details.currently.pressure,
            windSpeed: details.currently.windSpeed,
            windGust: details.currently.windGust,
            windBearing: details.currently.windBearing,
            cloudCover: details.currently.cloudCover,
            visibility: details.currently.visibility
        };
    }
};

module.exports = currentForecast;