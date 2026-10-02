"use client";
// Importing necessary modules
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// React functional component for BookingRoomPage
export default function BookingRoomPage() {
  const searchParams = useSearchParams()
  const paramsName = searchParams.get('name')
  
  console.log('paramsName: ' + paramsName)

  // State variables for form fields
  const [roomName, setRoomName] = useState(paramsName);
  const [participants, setParticipants] = useState('');
  const [purpose, setPurpose] = useState('');
  const [name, setName] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [email, setEmail] = useState('');
  const [roomNames, setRoomNames] = useState([]); // State to store available room names

  // Fetch room names from the server on component mount
  useEffect(() => {
    const fetchRoomNames = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5001/GetRoom"); // Update this URL with your backend endpoint for fetching room names
        setRoomNames(response.data.room_name || []); // Corrected to use 'room_name' instead of 'room_names'
        console.log("Room names response:", response);
      } catch (error) {
        console.error("Error fetching room names:", error);
      }
    };
  
    fetchRoomNames();
  }, []);
  

  // Function to handle form submission
  const handleRegister = async () => {
    // Your existing code...

    try {
      const response = await axios.post(
        "http://localhost:8090/addBooking",
        {
          roomName: roomName,
          participants: participants,
          purpose: purpose,
          name: name,
          bookingDate: bookingDate,
          startTime: startTime,
          endTime: endTime,
          status: "Waiting for Approval",
          email: email,
        },
      );

      console.log(response.data);
      if (response.data && response.data.message) {
        alert("Booking successful");
      } else if (response.data && response.data.error) {
        alert("Booking failed: " + response.data.error);
      }

    } catch (error) {
      console.error("Error during booking:", error);
    }

    // Reset the form fields
    setRoomName("");
    setParticipants("");
    setPurpose("");
    setName("");
    setBookingDate("");
    setStartTime("");
    setEndTime("");
    setEmail("");
  };

  // JSX for the component
  return (
    <div>
      {/* Form for booking */}
        {/* Input fields */}
        <label>
        Room Name:
        <select value={roomName} onChange={(e) => setRoomName(e.target.value)}>
          <option value="">Select Room</option>
          {roomNames.map((room, index) => (
            <option key={index} value={room} >
              {room} 
            </option>
          ))}
        </select>
      </label>
        <br />

        <label>
          Participants:
          <input type="text" value={participants} onChange={(e) => setParticipants(e.target.value)} />
        </label>
        <br />

        <label>
          Purpose:
          <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
        </label>
        <br />

        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />

        <label>
        Booking Date:
        <DatePicker
          selected={bookingDate}
          onChange={(date) => setBookingDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </label>
        <br />

        <label>
        Start Time:
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
        <br />

        <label>
        End Time:
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
        <br />

        {/* Additional fields can be added as needed */}

        {/* Button to submit the form */}
        <button onClick={handleRegister}>
          Book Room
        </button>
    </div>
  );
}

