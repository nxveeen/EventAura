"use client"

import React, { useState } from 'react';
// import { faker } from '@faker-js/faker';

const cities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'Ahmedabad',
  'Pune', 'Jaipur', 'Surat', 'Kanpur', 'Nagpur', 'Lucknow', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Vadodara', 'Ludhiana', 'Coimbatore',
  'Agra', 'Madurai', 'Jabalpur', 'Amritsar', 'Nashik', 'Faridabad',
  'Rajkot', 'Kalyan-Dombivli','Durgapur', 'Ranchi',
  'Howrah', 'Mangalore', 'Chandigarh', 'Dehradun', 'Shimla', 'Gwalior',
  'Jodhpur', 'Udaipur', 'Kota', 'Bhubaneswar', 'Bhilai',
];


const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">EventAura</h1>
        <div className="flex items-center space-x-4">
          
          <input 
            type="text"
            placeholder="Search for movies, events, plays and activites around you..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-40 border rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          
          
        </div>
      </div>
    </header>
  );
};

export default Header;
