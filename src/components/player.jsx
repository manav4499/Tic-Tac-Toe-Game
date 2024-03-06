import { useState } from "react" ;

export default function Player({initialName ,symbol, isActive, onChangeName}){
     const [playerName , setPlayerName] = useState(initialName);
     const [isEditing , setIsEditing] = useState(false);

     function handleEditClick(){
        setIsEditing((editing) =>!isEditing);  
        if(isEditing){
           onChangeName(symbol,playerName);
        }
     }
     function handleChange(event){
        console.log(event);
        setPlayerName(event.target.value);  
     }
    return(
        <li className={isActive ? 'active' : undefined }>
            <span className="player">
            {isEditing == false ? <span className="player-name">{playerName}</span> : <input type="text" required value={playerName} onChange={handleChange}/> } 
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing == false ? "Edit" : "Save"}</button>
          </li>
    )
}