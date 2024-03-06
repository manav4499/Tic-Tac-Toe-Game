import Player from "./components/player";
import GameBoard  from "./components/Gameboard";
import Log from "./components/Log";  
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";

const Players = {
  X:'Player 1',
  O:'Player 2',
}
const initialGameBoard = [
  [null, null,null ],
  [null, null,null ],
  [null, null,null ],
];

function App() {
  const  [players,setPlayers]= useState(Players)
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActiveplayer] = useState('X');
  


  let gameBoard = [...initialGameBoard.map(arr=>[...arr])] ;

    for(const turn of gameTurns){
        const{square,player} = turn ;
        const {row,col} = square ; 

        gameBoard[row][col] = player ;
    }

  let winner  = null;

  for(const combinations of WINNING_COMBINATIONS){
       const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
       const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
       const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];
       

       if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
       }
  }

  const hasDraw = gameTurns.length === 9 && !winner ;


  function handeSelectSquare(rowIndex, columnIndex){
    setActiveplayer((curActiveplayer)=>curActiveplayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns =>{
      let currentPlayer = 'X';
      if(prevTurns.length > 0 && prevTurns[0].player==='X'){
        currentPlayer = 'O';
      }
      const updatedTurns = [{square:{row: rowIndex,  col:columnIndex},player:currentPlayer},...prevTurns,];

      return updatedTurns ;
    });
  }


  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,[symbol]:newName 
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player symbol = "X" 
          initialName={Players.X} 
          isActive={activePlayer==='X' } 
          onChangeName ={handlePlayerNameChange}/>

          <Player symbol = "O" 
          initialName={Players.O} 
          isActive={activePlayer==='O' } 
          onChangeName ={handlePlayerNameChange}/>

        </ol> 
        {(winner || hasDraw) && <GameOver winner = {winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handeSelectSquare} board={gameBoard}/>
      </div>
      <Log eachTurn={gameTurns}/>
    </main>
  )
}

export default App
