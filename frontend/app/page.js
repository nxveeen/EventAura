"use client";
import React, { useState, useEffect } from "react";
import Header from "./ui/header";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState({ members: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/");
      const jsonData = response.data;
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      setError("Error fetching data");
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Header />
      <nav>
        <ul>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <h2>Hi</h2>
      {error && <p>{error}</p>}
      <ul className="flex">
        {data.members.length > 0 ? (
          data.members.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <li>No members found</li>
        )}
      </ul>
    </div>
  );
}
