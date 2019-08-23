import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'httpclient';
  WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1"
  model = new Weather(0,0,0,'',0,0);
  constructor(private weatherSvc: WeatherService){

  }

  countries = [
    {city: "Singapore"},
    {city: "London"},
    {city: "Bangkok"}
  ]

  changeCity($event){
    console.log($event.target.value)
    this.weatherSvc.getWeather($event.target.value, this.WEATHER_API_KEY).then((result)=>{
      this.model = new Weather(result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
      if ($event.target.value == "Bangkok") {
        document.getElementsByTagName("img")[0].src = "http://www.orangesmile.com/common/img_city_maps/bangkok-map-1.jpg";  
      }
      else if ($event.target.value == "London") {
        document.getElementsByTagName("img")[0].src = "https://images-na.ssl-images-amazon.com/images/I/A17jCmQBvqL._SL1500_.jpg";  
      }
      else{
        document.getElementsByTagName("img")[0].src = "https://www.nea.gov.sg/assets/images/map/base-853.png";  
      }
      
    }).catch((error)=>{
      console.log(error);
    })
  }

  ngOnInit(){
    console.log("retrieve weather !")
    this.weatherSvc.getWeather("Singapore", this.WEATHER_API_KEY).then((result)=>{
      console.log(result);
      console.log(result.main);
      this.model = new Weather(result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
  
      //console.log()
    }).catch((error)=>{
      console.log(error);
    })
  }
}
