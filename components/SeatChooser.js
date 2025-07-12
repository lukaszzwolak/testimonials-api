import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SeatChooser = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(
      process.env.NODE_ENV === "production" ? "" : "ws://localhost:8000",
      { transports: ["websocket"] }
    );
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return (
    <div>
      <h2>Seat SeatChooser</h2>
      <p>Socket connection: {socket ? "Yes" : "No"}</p>
    </div>
  );
};
