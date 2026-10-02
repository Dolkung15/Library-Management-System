"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function PurposePage() {
  const [purposes, setPurposes] = useState([]);

  useEffect(() => {
    const fetchPurpose = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5001/purpose");
        setPurposes(response.data.purpose || []);
        console.log("Purpose data response:", response);
      } catch (error) {
        console.error("Error fetching purpose data:", error);
      }
    };

    fetchPurpose();
  }, []);

  return (
    <div>
      <h2>Purposes</h2>
      <ul>
        {purposes.map((purpose, index) => (
          <li key={index}>{purpose}</li>
        ))}
      </ul>
      <button>Approve</button>
      <button>Not Approve</button>
    </div>
  );
}