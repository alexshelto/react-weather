import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';



const api = {
  key: 'f42e61576713df989fd80dd11d4594b8',
  base: 'https://api.openweathermap.org/data/2.5/'
}




function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
     }
  }


  return(
    <div className="App">
        <main>
          <div className="search-box">
            <input type="text"
             className="search-bar"
             placeholder="Search.."
             value={query}
             onKeyPress={search}
             onChange={e => setQuery(e.target.value)} />
          </div>
          
          <div className="location-box">
            <div className="location">
              <p>Athens, Ohio</p>
            </div>
            
            <div className="time">
              <p>4:20pm </p>
            </div>
          </div>

            <div className="weather-box">
              <div className="temp">
                <h2> 0 degrees </h2>
              </div>
            
            <div className="conditions">
              <p> Sunny </p>
            </div>
          </div>
        </main>
    </div>
  );

}


export default App;
