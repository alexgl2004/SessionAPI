import "./Actor.css";
import { Link } from 'react-router-dom';
import { actors } from "../data/actors.js";
//import { movies } from "../data/movies.js"; 
import { useParams } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import noimg from "../assets/noimg.png";

export default function Actor() {

  const { characterId } = useParams()

  const [character, setCharacter] = useState([])


  async function handleLoadData(){

    try{

      const response = await axios.get(
        "https://hp-api.onrender.com/api/characters"
      )
 //     console.log(response.data)

      setCharacter(response.data.filter((character_m) => {
        return character_m.id == characterId;
      })[0]);
    


    }catch (error){
      console.log(error)
      alert('Problem mit load data!')
    }
  }

  if(character['id']==undefined){
    handleLoadData()
  }
  
  console.log(character)


/*
  let MoviesArr = movies.filter((movie) => {
    const findet_films = movie.cast.filter((actor_m) => {
      return actor_m.id == actor.id
    })[0]
    //console.log(movie.id)
    
    if(findet_films!=undefined){
      return movie.id;
    }
  });

  <h3>Films:</h3>
        <div>
          <ul>
            /**
           {MoviesArr.map((movie, index) => (
              <li key={movie.id}>
                  <Link className="movie_link" to={"/movies/" + movie.id} key={movie.id}>
                    <div className="movie_img">
                      <div>{movie.title}</div>
                      <img src={movie.thumbnail} alt={movie.title} />
                    </div>
                  </Link>  
                </li>        
              ))
            }       
          </ul>
        </div>
*/
  return (
    <>
      <div className="Actor">
        <h1>{character.name}</h1>
        <div className="actor_block">
          <div className="actor_img">
            <img src={character.image?character.image:noimg} alt={character.title} />
          </div>
          <div className="actor_about">
            <ul className="actor_character">
            {character.alternate_names!=undefined? (<li><span>Alternate names:</span><ul>
                {character.alternate_names.map((alternate_name, index) => (
                <li key={alternate_name}>{alternate_name}</li>   
              ))}
              </ul></li>):''}
              <li><span>Ancestry:</span> {character.ancestry}</li>
              <li><span>Date Of Birth:</span> {character.dateOfBirth}</li>
              <li><span>Eye colour:</span> {character.eyeColour}</li>
              <li><span>Hair colour:</span> {character.hairColour}</li>
              <li><span>House:</span> {character.house}</li>
              <li><span>Patronus:</span> {character.patronus}</li>
              <li><span>Species:</span> {character.species}</li>
              <li><span>Ancestry:</span> {character.ancestry}</li>
              <li>--------------------</li>
              {character.hogwartsStudent?(<li><span>Hogwarts Student</span></li>):''}
              {character.wizard?(<li><span>Wizard</span></li>):''}
              {character.alive?(<li><span>Alive</span></li>):''}
            </ul>

          </div>            
        </div>        
        
        <div className="">
          <Link className="showMore" to={"/characters/"}>Back to Characters..</Link>
        </div>
      </div>
    </>
  );
}

/*
            {
              id: 1158,
              name: "Al Pacino",
*/