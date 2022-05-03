//api.openweathermap.org/data/2.5/weather?q=delhi&appid=e5212f1f496b53d5fa5824a5df8bd8dd

import React from 'react';
import Weathercard from './weathercard';
import "./style.css";

const Temp = () => {

    const [searchValue , setSearchValue] = React.useState("");
    const [tempInfo , setTempInfo] = React.useState("");
    const getWeatherInfo = async () => { 
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=38e8d454ce9f7c7464631c2ae1afe203`;

            let res = await fetch(url);
            let data = await res.json();

            const {temp , humidity , pressure} = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country , sunset} = data.sys;
            const myNewWeatherInfo = {
                temp, humidity, pressure ,weathermood,name , speed , country , sunset,
            };
            setTempInfo(myNewWeatherInfo);
        }catch(error){
            console.log(error);
        }
    };

    React.useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <div>
            <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
        </div>
    )
}

export default Temp;
