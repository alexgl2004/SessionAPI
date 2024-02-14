import "./Actors.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import noimg from "../assets/noimg.png";
import { FilterBox } from "../components/FilterBox";

export default function Actors() {
  const [characters, setCharacters] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(
          "https://hp-api.onrender.com/api/characters"
        );
        console.log(response.data);
        setCharacters(
          response.data.filter((character) => (character.actor ? true : false))
        );
      } catch (error) {
        console.log(error);
        alert("Problem mit load data!");
      }
    }
    loadData();
  }, []);

  // derived state

  function createFilterList(propName) {
    return characters.reduce((acc, cur) => {
      if (!cur[propName]) return acc;
      if (acc.find((value) => cur[propName] === value)) {
        return acc;
      } else {
        return [...acc, cur[propName]];
      }
    }, []);
  }

  const charactersToDisplay = characters.filter((character) => {
    const houseMatch =
      !selectedHouse ||
      character.house.toUpperCase().indexOf(selectedHouse.toUpperCase()) !== -1;
    const speciesMatch =
      !selectedSpecies || character.species === selectedSpecies;
    return speciesMatch && houseMatch;
  });

  return (
    <>
      <h2>Characters</h2>
      <div>
        <div className="Searches">
          <input
            type="text"
            value={selectedHouse}
            onChange={(event) => {
              setSelectedHouse(event.target.value);
            }}
          />
          <FilterBox
            boxStyle="linklist"
            data={createFilterList("house").map((house) => {
              return { key: house, value: house };
            })}
            onFilterChange={(key) => {
              setSelectedHouse(key);
            }}
          />

          <FilterBox
            boxStyle="select"
            data={createFilterList("species").map((item) => {
              return { key: item, value: item };
            })}
            onFilterChange={(key) => {
              setSelectedSpecies(key);
            }}
          />
        </div>
        <ul className="Actors">
          {charactersToDisplay.map((character) => (
            <>
              <li key={character.id}>
                <Link className="actor_a" to={"/characters/" + character.id}>
                  <div className="actors_block">
                    <div className="actor_img">
                      <img
                        src={character.image ? character.image : noimg}
                        alt={character.name}
                      />
                    </div>
                    <div className="actors_about">
                      <h3>
                        {character.name}
                        <div>
                          <small>({character.actor})</small>
                        </div>
                      </h3>
                    </div>
                  </div>
                </Link>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
