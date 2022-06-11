import React, { useState,useEffect } from "react";
import "./Style.css";
import Weathercard from "./Weathercard";

const Temp = () => {

  const [searchValue,setSearchValue]=useState("Pune");
  const[tempInfo,settempInfo]=useState({});

  const getWeatherInfo=async()=>{
    try {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0c521b1e761a629280c40fbc9f098e84`;
    
        const res=await fetch(url);
        const data=await res.json();
        
        console.log(data);

        const {temp,humidity,pressure}=data.main;
        // console.log(temp,humidity,pressure);
        // console.log(temp);

        const{main:weathermood}=data.weather[0];
        const{name}=data;
        const{speed}=data.wind;

        const{country,sunset}=data.sys;

        const myNewWeatherInfo={
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,sunset,
        };
        settempInfo(myNewWeatherInfo);
      } 
      catch (error) {
        console.log(error); 
    }
  };
  
  useEffect(() => { 
    getWeatherInfo();
  },[]);
  
  return (
    <>
      <div className="Heading">-- Weather Report --</div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Enter City"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* Our temp card */}

    
     <Weathercard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
