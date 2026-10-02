"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Link from 'next/link'


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

// React functional component for BookingRoomPage
export default function BookingRoomHistory() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Assume "someName" is the name you want to pass, replace it with the actual name
        const response = await axios.get("http://localhost:8090/BookingByName?name=ไอyellow");
        setRooms(response.data || []);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
  
    fetchRooms();
  }, []);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 

  const handleDelete = async (x) => {
    try {
        const response = await axios.post(
            "http://localhost:8090/deleteBooking",
            { _id: x },
            { headers: { "Content-Type": "application/json" } }
        );
        if (response.data) {
            // Data was successfully deleted, update your state or re-fetch the data
            // ...
        } else {
            // Data deletion failed
            // ...
        }
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

  const modalStyles = {
    content: {
      width: '50%',
      height: '50%',
      margin: 'auto',
      overflow: 'auto',
    },
  };

  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <strong>Room Name:</strong> {room.roomName}<br />
            <strong>Purpose:</strong> {room.purpose}<br />
            <strong>Participants:</strong> {room.participants}<br />
            <strong>Status:</strong> {room.status}<br />
            <strong>bookingDate</strong> {room.bookingDate}<br />
            <strong>startTime:</strong> {room.startTime}<br />
            <strong>endTime:</strong> {room.endTime}<br />
            <button onClick={() => handleRoomClick(room)}>View Details</button>
          
            <Link href={`/bookingroom/editbooking?_id=${room._id}`}>Edit Booking</Link>
            <button onClick={() => handleDelete(room._id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Room Details Modal"
        style={modalStyles}
      >
        <h3>Selected Room Details</h3>
        {selectedRoom && (
          <div>
            <p><strong>Room Name:</strong> {selectedRoom.roomName}</p>
            <p><strong>Purpose:</strong> {selectedRoom.purpose}</p>
            <p><strong>Participants:</strong> {selectedRoom.participants}</p>
            <p><strong>Status:</strong> {selectedRoom.status}</p>
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}