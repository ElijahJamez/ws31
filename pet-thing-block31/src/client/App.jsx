import React, { useState } from "react";

import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [dogName, setDogName] = useState("_");
  const [query, setQuery] = useState("");

  const getAllPets = async () => {
    const response = await fetch("/api/pets");
    const pets = await response.json();
    setResults(pets);
  };

  const getPetByName = async (name) => {
    const response = await fetch(`/api/pets/${name}`);
    const pet = await response.json();
    setResults(pet);
    setDogName("_");
  };

  const getOwnerByName = async () => {
    const response = await fetch(`/api/pets/owner?name=${query}`);
    const pets = await response.json();
    setResults(pets);
    setQuery("");
  };

  return (
    <div>
      <div>
        <h2>What Are You Looking For?</h2>
        <div>
          <h2>Find All Pets</h2>
          <button onClick={() => getAllPets()}>All Pets</button>
        </div>
        <div>
          <h2>Find Pet By Name</h2>
          <div>
            <input
              value={dogName === "_" ? "" : dogName}
              placeholder="Pet Name..."
              onChange={(e) => setDogName(e.target.value)}
            />
            <button onClick={() => getPetByName(dogName)}>Search</button>
          </div>
          <div>
            <h2>Find Owner</h2>
            <input
              value={query}
              placeholder="Owner Name..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => getOwnerByName()}>Search</button>
          </div>
        </div>
      </div>
      <div>
        <h2>Results</h2>
        <ul>
          {results.length > 0
            ? results.map((pet) => (
                <li key={pet.id}>
                  <h3>Name: {pet.name}</h3>
                  <h5>Breed: {pet.breed}</h5>
                  <h5>Age: {pet.age}</h5>
                  <h5>Owner: {pet.owner}</h5>
                  <h5>Phone #: {pet.telephone}</h5>
                </li>
              ))
            : "No Pets Found"}
        </ul>
      </div>
    </div>
  );
}

export default App;
