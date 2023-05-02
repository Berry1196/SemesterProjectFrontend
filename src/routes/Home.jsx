import React, { useEffect, useState } from "react";
import facade from "../ApiFacade";

const Home = ({ username, role }) => {
  const [joke, setJoke] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    facade.fetchData("http://localhost:8080/api/cars/jokes").then((res) => {
      setJoke(res.value);
    });
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    facade.createJoke(input).then((res) => {
      console.log(res);
    });
  };

  return <div className="text-sm">{joke}</div>;
};

export default Home;
