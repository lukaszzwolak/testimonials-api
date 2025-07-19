import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getSeats, loadSeats } from "../../../redux/seatsRedux";
import { Button, Alert, Progress } from "reactstrap";
import "./SeatChooser.scss";

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const [socket, setSocket] = useState(null);

  // Socket.io połączenie
  useEffect(() => {
    const newSocket = io(
      process.env.NODE_ENV === "production" ? "" : "ws://localhost:8000",
      { transports: ["websocket"] }
    );
    setSocket(newSocket);

    newSocket.on("seatsUpdated", (seats) => {
      dispatch(loadSeats(seats));
    });

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);

  // Sprawdzenie czy miejsce zajęte w danym dniu
  const isTaken = (seatId) =>
    seats.some((item) => item.seat === seatId && item.day === chosenDay);

  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className="seats__seat" color="primary">
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className="seats__seat" disabled color="secondary">
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color="primary"
          className="seats__seat"
          outline
          onClick={(e) => updateSeat(e, seatId)}
        >
          {seatId}
        </Button>
      );
  };

  // Liczenie miejsc tylko dla wybranego dnia
  const takenSeats = seats.filter((s) => s.day === chosenDay).length;
  const totalSeats = 50;
  const freeSeats = totalSeats - takenSeats;

  return (
    <div>
      <h3>Pick a seat</h3>
      <div className="mb-4">
        <small id="pickHelp" className="form-text text-muted ms-2">
          <Button color="secondary" /> – seat is already taken
        </small>
        <small id="pickHelpTwo" className="form-text text-muted ms-2">
          <Button outline color="primary" /> – it's empty
        </small>
      </div>

      <p className="mb-3">
        Free seats: {freeSeats}/{totalSeats}
      </p>

      <div className="seats">
        {[...Array(50)].map((_, i) => prepareSeat(i + 1))}
      </div>
    </div>
  );
};

export default SeatChooser;
