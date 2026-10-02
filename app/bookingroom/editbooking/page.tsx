// Importing necessary modules
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'next/navigation'

// Define the type for a room
interface Room {
  _id: string;
  roomName: string;
  participants: string;
  purpose: string;
  name: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  email: string;
}

// React functional component for EditBookingPage
export default function EditBookingPage() {
  const { id } = useParams<{ id: string }>();

  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8090/BookingBy/${id}`);
          setRoom(response.data || null);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoom();
  }, [id]);

  return (
    <div>
      <h2>Edit Booking Details</h2>
      {room ? (
        <div>
          {/* Show your form for editing with pre-filled values from the room object */}
          <label>
            Room Name:
            <input type="text" value={room.roomName} onChange={(e) => /* handle change */} />
          </label>
          {/* Other form fields */}
          <button>{/* Save changes button */}</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
