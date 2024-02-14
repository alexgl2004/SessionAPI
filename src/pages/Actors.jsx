import "./Actors.css";
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import noimg from "../assets/noimg.png";

export default function Actors() {

  const [characters, setCharacters] = useState([])
  //const [houses, setHouses] = useState([])
  const [house, setHouse] = useState("")
  const [species, setSpecies] = useState("")

  function setStateF(val,property){
    switch(property){
      case 'house':
        setHouse(val)
      break;
      case 'species':
        setSpecies(val)
      break;
    }

  }

  function outLabel(property){
    switch(property){
      case 'house':
        return (
          <><label className="label_search" htmlFor="charachter_search">Filter by House: </label>
          <input name="charachter_search" type="text" value={house} onChange={(event) =>{
            setHouse(event.target.value)
          }}/></>
        );
      break;
      case 'species':
        return (
          <><label className="label_search" htmlFor="charachter_search">Filter by Species: </label>
          <input name="charachter_search" type="hidden" value={species} onChange={(event) =>{
            setSpecies(event.target.value)
          }}/></>
        )
      break;
      default:
      break;
    }
  
  }

  function makeSearchByProperty(property){

    let temp_Houses = []

    characters.forEach((character, index) => {
      if(temp_Houses.indexOf(character[property])==-1 && character[property]){
        temp_Houses.push(character[property])
      }
    });    
    switch(property){
     case 'house':
        return (
          <>
            <div className="search_help_buttons">
             <button value="" onClick={(event) => setStateF(event.target.value,property)}>ALL</button>
              {temp_Houses.map((house_m, index) => (
                <button value={house_m} onClick={(event) => setStateF(event.target.value,property)}>{house_m}</button>
              ))
              }
            </div>
            {outLabel(property)}
          </>
        )
      break;
      case 'species':
        return (
          <>
            {outLabel(property)}
            <select name="select_names" className="search_help_buttons" onChange={(event) => setStateF(event.target.value,property)}>
              <option value="">ALL</option>
              {temp_Houses.map((house_m, index) => (
                <option value={house_m}>{house_m}</option>
              ))
              }
            </select>
            
          </>
        )
      break;
    }
    
  }

  async function handleLoadData(){

    try{

      const response = await axios.get(
        "https://hp-api.onrender.com/api/characters"
      )
      console.log(response.data)
      setCharacters(response.data)

    }catch (error){
      console.log(error)
      alert('Problem mit load data!')
    }
  }

  if(characters[0]==undefined){
    handleLoadData()
  }


  //console.log(temp_Houses)

  let characters_out = characters;

  if(house!=''){
   // console.log(house)
    characters_out = characters_out.filter((character) => {
      //console.log(character.house.toUpperCase().indexOf(house.toUpperCase()), character.house, house)
      return character.house.toUpperCase().indexOf(house.toUpperCase())!=-1
    });
  }else{
   
  }

  if(species!=''){
    // console.log(house)
     characters_out = characters_out.filter((character) => {
       //console.log(character.house.toUpperCase().indexOf(house.toUpperCase()), character.house, house)
       return character.species.toUpperCase().indexOf(species.toUpperCase())!=-1
     });
   }else{
     
   }

 //  console.log(species,house)

  return (
    <>
        <h2>Characters</h2>
        <div>
            <div className="Searches">
            {makeSearchByProperty('house')}
            {makeSearchByProperty('species')}
            </div>
            <ul className="Actors">
              {characters_out.map((character, index) => (
                <>
                {!character.actor?'':(
                <li key={character.id}>
                  <Link className="actor_a" to={"/characters/" + character.id}>
                    <div className="actors_block">
                      <div className="actor_img">
                          <img src={character.image?character.image:noimg} alt={character.name} />
                      </div>
                      <div className="actors_about">
                        <h3>{character.name}<div><small>({character.actor})</small></div></h3>               
                      </div>            
                    </div>
                  </Link>
                </li>)}
                </>
                ))
              }
            </ul>
            
        </div>
    </>
  );
}