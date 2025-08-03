import { Alert, Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getConcerts,
  getRequest,
  loadConcertsRequest,
} from "../../../redux/concertsRedux";

const Prices = () => {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadConcertsRequest());
  }, [dispatch]);

  const getPriceForDay = (day) => {
    const concertsForDay = concerts.filter((concert) => concert.day === day);
    const prices = concertsForDay.map((c) => c.price);

    if (!prices.length) {
      if (day === 2) return 25;
      if (day === 3) return 50;
      return "-";
    }

    return Math.min(...prices);
  };

  if (request.pending) return <p>Loading...</p>;
  if (request.error) return <p>Error: {request.error}</p>;

  return (
    <Container>
      <h1>Prices</h1>
      <p>
        Prices may differ according the day of the festival. Remember that
        ticket includes not only the star performance, but also 10+ workshops.
        We gathered several genre teachers to help you increase your vocal
        skills, as well as self confidence.
      </p>

      <Alert color="info">
        Attention!{" "}
        <strong>
          Children under 4 can go freely with you without any other fee!
        </strong>
      </Alert>

      <h2>Day one</h2>
      <p>Price: {getPriceForDay(1)}$</p>
      <p>
        Workshops: "Rock Music Style", "How to make your voice grooowl", "Make
        your voice stronger", "History of Rock"
      </p>

      <h2>Day Two</h2>
      <p>Price: {getPriceForDay(2)}$</p>
      <p>
        Workshops: "Find your real tune", "Find your real YOU", "Feel the
        music", "Jam session"
      </p>

      <h2>Day Three</h2>
      <p>Price: {getPriceForDay(3)}$</p>
      <p>
        Workshops: "Increase your vocal range", "How to properly warm up before
        singing", "It's time for YOU!"
      </p>
    </Container>
  );
};

export default Prices;
