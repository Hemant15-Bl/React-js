import React, { useEffect, useRef, useState } from 'react'
import './Weather.css';
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import humidity_icon from '../assets/humidity.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    //----- dynamically change search input --------
    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    //-------- Icon update ---------------
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03n": cloud_icon,
        "03d": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }

    // ------- search function for get weather details ------------
    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }

        
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            //console.log(data);

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.feels_like),
                mintemp: Math.floor(data.main.temp_min),
                maxtemp: Math.ceil(data.main.temp_max),
                location: data.name,
                icon: icon
            })

        
    }

    useEffect(() => {
        search();
    }, [])
    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ?
                <>
                    <img src={weatherData.icon} alt="" className='weather-icon' />
                    
                    <p className='temperature'>{weatherData.temperature}°c</p>
                    <p style={{color:"white", fontSize:"15px"}}>Overcast {weatherData.mintemp}° / {weatherData.maxtemp}°</p>

                    <p className='location'>{weatherData.location}</p>

                    <div className="weather-data ">
                        <div className="col">
                            <img src={humidity_icon} alt="" />
                            <div><p>{weatherData.humidity}%</p> <span></span></div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div><p>{weatherData.wind} Km/h</p> <span></span></div>
                        </div>
                    </div>

                </> : <> <p style={{color:"white", textAlign:"center", marginTop:"3%", fontWeight:"bold"}}>--- You can check weather by enter city name ---</p></>}

        </div>
    )
};

export default Weather;