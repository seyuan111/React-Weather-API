import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css'
import Weather from './components/root';
import Form from './components/form';

const APIK = '53d5ab9baedfa34cf3599c8db30a3b2c';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      state: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: undefined,
      error: false

    }

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calCelcius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons,rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm})
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weatherIcon.Drizzle})
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.weatherIcon.Rain})
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weatherIcon.Snow})
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere})
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear})
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weatherIcon.Clouds})
        break;
    }
  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const state = e.target.elements.city.value;

    if(city && state){
    const WAPI = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${APIK}`)
  
    const response = await WAPI.json();

    console.log(response);

    this.setState({
      city: `${response.name}, ${response.state}`,
      celcius: this.calCelcius(response.main.temp),
      temp_max: this.calCelcius(response.main.temp_max),
      temp_min: this.calCelcius(response.main.temp_min),
      description: response.weather[0].description,
    })

    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
  }else{
    this.setState({error:true})
  }
}
  
  render(){
  return(
  <div className="App">
  <Form loadweather={this.getWeather} error={this.state.error}/>
    <Weather
        city={this.state.city}
        state={this.state.state}
        temp_celcius={this.state.celcius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}/>
  </div>
  )
  }
}

export default App;
