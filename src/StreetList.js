import React, { useState } from 'react';
import axios from 'axios';

function StreetList() {
    const [streets, setStreets] = useState([]);//array of street objects fetched from the API.
    const [loading, setLoading] = useState(false);//data is being fetched from the API
    const [searchLetter, setSearchLetter] = useState('');//letter to search

    const fetchStreets = async () => {
        setLoading(true);//loading started
        try {
            const response = await axios.get(`http://localhost:5180/api/streets/startswith?letter=${searchLetter}`);//calling api
            setStreets(response.data);//putting  the data to street 
        } catch (error) {
            console.error('Error fetching streets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchStreets();
    };

    const handleInputChange = (event) => {
        setSearchLetter(event.target.value);
    };

    return (
        <div>
            <h1>Streets Starting with {searchLetter}</h1>
            <div>
                <input type="text" value={searchLetter} onChange={handleInputChange} />
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {streets.map(street => (
                        <li key={street.id}>{street.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StreetList;
