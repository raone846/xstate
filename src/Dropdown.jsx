import React, { useEffect, useState } from 'react'

function Dropdown() {
    //Api fetch for the countries
    const API_URL = "https://crio-location-selector.onrender.com/countries";
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        fetch(API_URL).then((res) => res.json()).then((data) => setCountries(data)).catch((error) => console.error("Error fetching data: "+error));
    },[]);

    //Api fetch for the states
    const [state, setState] = useState([]);
    const[selectedState, setSelectedState] = useState("");
    useEffect(() => {
        if(!selectedCountry) return;
        fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).then((res) => res.json()).then((data) => setState(data)).catch((error) => console.error("Error fetching data: "+error));
    },[selectedCountry]);

    //Api fetch for the cities
    const [city, setCity] = useState([]);
    const[selectedCity, setSelectedCity] = useState("");
    useEffect(() => {
        if(!selectedState) return;
        fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).then((res) => res.json()).then((data) => setCity(data)).catch((error) => console.error("Error fetching data: "+error));
    },[selectedCountry,selectedState]);

  return (
    <div>
        <h1>Select Location</h1>
        <select name="country" id="country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option>Select Country</option>
            {countries.map(country=> <option value={country} key={country}>{country}</option>)}   
        </select>
        <select name="state" id="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
            <option>Select State</option>
            {state.map(state=> <option value={state} key={state}>{state}</option>)}   
        </select>
        <select name="city" id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
            <option>Select City</option>
            {city.map(city=> <option value={city} key={city}>{city}</option>)}   
        </select>
        <div>
            {selectedCity && (
                <h3>
                    You selected <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{selectedCity},</span>{' '}
                    <span style={{ color: 'grey' }}>{selectedState},</span>{' '}
                    <span style={{ color: 'grey' }}>{selectedCountry}</span>
                </h3>
            )} 
        </div>
               
    </div>
  )
}

export default Dropdown