"use client"
import React, { useState, useEffect } from "react";
import Header from "./ui/header";

export default function Home() {
  const [data, setData] = useState({ members: [] }); // Initial state for 'members'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/");
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData); 
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div >
      <Header />
      <h2 className="">hii</h2>
      <ul className="flex ">
        {data.members.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
