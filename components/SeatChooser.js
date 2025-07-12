import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { loadSeats } from "../redux/seatsRedux";

const SeatChooser = () => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(
      process.env.NODE_ENV === "production" ? "" : "ws://localhost:8000",
      { transports: ["websocket"] }
    );
    setSocket(newSocket);

    // Nasłuchiwanie na zmiany miejsc
    newSocket.on("seatsUpdated", (seats) => {
      dispatch(loadSeats(seats));
    });

    return () => newSocket.disconnect();
  }, [dispatch]);

  return (
    <div>
      <h2>SeatChooser</h2>
      <p>Socket connection: {socket ? "Yes" : "No"}</p>
    </div>
  );
};

export default SeatChooser;
