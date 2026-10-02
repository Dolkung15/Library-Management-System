"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Link from 'next/link'

// Define the type for a room
interface Room {
  room_name: string;
  room_description: string;
  room_participants: string;
}

// React functional component for BookingRoomPage
export default function BookingRoomPage() {
  

  // State variables for form fields
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch room data from the server on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5001/GetAllRoom");
        setRooms(response.data.rooms || []);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRooms();
  }, []);

  // Function to handle clicking on a room
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to navigate to the add booking page


  // Styles for the modal
  const modalStyles = {
    content: {
      width: '50%', // Adjust the width as needed
      height: '50%', // Adjust the height as needed
      margin: 'auto',
      overflow: 'auto',
    },
  };

  // JSX for displaying the rooms and details
  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <strong>Room Name:</strong> {room.room_name}<br />
            <strong>Description:</strong> {room.room_description}<br />
            <strong>Participants:</strong> {room.room_participants}<br />
            <button onClick={() => handleRoomClick(room)}>View Details</button>
            <button ><Link href={`/bookingroom/addbooking?name=${room.room_name}`} >Add Booking</Link></button>
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
            <p><strong>Room Name:</strong> {selectedRoom.room_name}</p>
            <p><strong>Description:</strong> {selectedRoom.room_description}</p>
            <p><strong>Participants:</strong> {selectedRoom.room_participants}</p>
          </div>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

