"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Modal from 'react-modal';

// Define the type for a room
interface Room {
  _id: string;
  roomName: string;
  participants: number;
  purpose: string;
  name: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  email: string;
}

// React functional component for BookingRoomPage
export default function BookingRoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8090/Booking");
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

  const modalStyles = {
    content: {
      width: '50%', // Adjust the width as needed
      height: '50%', // Adjust the height as needed
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
            {room.status !== 'Waiting for Approval' && (
              <div>
                <strong>Room Name:</strong> {room.roomName}<br />
                <strong>Booking Date:</strong> {room.bookingDate}<br />
                <strong>Start - End: </strong> {room.startTime} - {room.endTime}<br />
                <button onClick={() => handleRoomClick(room)}>View Details</button>
              </div>
            )}
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
        {selectedRoom && (
          <div>
            <h3>Booking Details</h3>
            <p><strong>Room Name:</strong> {selectedRoom.roomName}</p>
            <p><strong>Participants:</strong> {selectedRoom.participants}</p>
            <p><strong>Purpose:</strong> {selectedRoom.purpose}</p>
            <p><strong>Name:</strong> {selectedRoom.name}</p>
            <p><strong>Booking Date:</strong> {selectedRoom.bookingDate}</p>
            <p><strong>Start Time:</strong> {selectedRoom.startTime}</p>
            <p><strong>End Time:</strong> {selectedRoom.endTime}</p>
            <p><strong>Email:</strong> {selectedRoom.email}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}


