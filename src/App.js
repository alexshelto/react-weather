import React, { useState } from 'react';



const api = {
  key: process.env.REACT_APP_KEY,
  base: 'https://api.openweathermap.org/data/2.5/'
}



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const calcTime = (offset) => {

    const d = new Date();
    let hr = parseInt(d.getUTCHours());
    console.log("Before calc time: hour: " + hr + " sec");
    console.log('offset: ' + offset);

    if (offset > 0) {
      //adding hours
      console.log('adding hrs');
      hr += (offset / (60 * 60));
      if (hr > 23) { hr = hr - 24; }
    }
    else {
      //removing time:
      console.log("removing time");
      console.log(offset / (60 * 60));
      hr += (offset / (60 * 60));
      if (hr < 0) { hr = hr + 24; }
    }
    console.log(hr);
    var strTime;
    //gross fix for adding another 0 in front of times that hr < 10: ex: 8:30 -> 08:30
    if (hr < 10) strTime = `0${hr}:${d.getMinutes()}`;
    else strTime = `${hr}:${d.getMinutes()}`;

    // return strTime;
    return strTime;
  }


  const toFarenheit = (temp) => {
    return (temp * 9 / 5) + 32;
  }

  //Note: configured for local time. will need to fix this
  const selectBackground = () => {


    if (typeof weather.main == 'undefined') {
      return ('App');
    }

    //Include dynamic bg pic logic


    return 'App default';
  }


  return (
    <div className={selectBackground()}>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="time">{calcTime(weather.timezone)}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(toFarenheit(weather.main.temp))}°F
            </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );


}


export default App;
