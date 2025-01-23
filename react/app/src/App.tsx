import React, { useState } from 'react';

const App: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [winMsg, setWinMsg] = useState<string>("");
  const [isSolvedBool, setIsSolved] = useState(false);
  const [enableGame, setEnableGame] = useState(false);
  const shuffleTiles = () => {
    const mixed = mixTiles();
    setTiles(mixed);
    setMoveCount(0);
    setEnableGame(true);
    setWinMsg('');
    setIsSolved(false);
  };

  const handleTileClick = (index: number): number[] => {
    console.log(tiles);

    if (isSolved(tiles) || enableGame === false) {
      console.log("Puzzle already solved!");
      return tiles;
    }
  
    const tileValue = tiles[index];
    if (tileValue === 0) { return tiles; }
    console.log(`Clicked tile at index ${index}, value: ${tileValue}, moves: ${moveCount + 1}`);
    let newTiles = [...tiles];

    if (tiles[index - 3] === 0 && index - 3 >= 0) {
      // Move up
      [newTiles[index], newTiles[index - 3]] = [newTiles[index - 3], newTiles[index]];
      setTiles(newTiles);
      setMoveCount((count) => count + 1);
    } else if (tiles[index + 3] === 0 && index + 3 < tiles.length) {
      // Move down
      [newTiles[index], newTiles[index + 3]] = [newTiles[index + 3], newTiles[index]];
      setTiles(newTiles);
      setMoveCount((count) => count + 1);
    } else if (tiles[index - 1] === 0 && index % 3 !== 0) {
      // Move left
      [newTiles[index], newTiles[index - 1]] = [newTiles[index - 1], newTiles[index]];
      setTiles(newTiles);
      setMoveCount((count) => count + 1);
    } else if (tiles[index + 1] === 0 && (index + 1) % 3 !== 0) {
      // Move right
      [newTiles[index], newTiles[index + 1]] = [newTiles[index + 1], newTiles[index]];
      setTiles(newTiles);
      setMoveCount((count) => count + 1);
    }
    return newTiles;
  };

  function isSolved(tiles: number[]): boolean {
    if (moveCount === 0)
      return false;
    for (let i = 0; i < tiles.length - 2; i++){
      if (tiles[i] > tiles[i+1]){
          setIsSolved(false);
          return false;
        }
    }
    setIsSolved(true);
    return true;
  }

  function isSolvable(tiles: number[]): boolean {
    let inversions = 0;
    // Count inversions (ignoring 0)
    for (let i = 0; i < tiles.length; i++) {
      for (let j = i + 1; j < tiles.length; j++) {
        if (tiles[i] > 0 && tiles[j] > 0 && tiles[i] > tiles[j]) {
          inversions++;
        }
      }
    }
  
    // For a 3×3 puzzle, solvability depends on inversions being even
    return inversions % 2 === 0;
  }

  function mixTiles(): number[] {
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  
    // Fisher-Yates Shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[randomIndex]] = [tiles[randomIndex], tiles[i]];
    }
  
    // Check solvability for 3x3 puzzle
    if (!isSolvable(tiles)) {
      [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
    }
    return tiles;
  }



  return (
    <div className="App">
      <div className={`pyro ${isSolvedBool ? '' : 'hidden'}`}>
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <h1>3×3 Sliding Puzzle</h1>
      <button className="btn" onClick={shuffleTiles}>Shuffle</button>
      <div className="puzzle-grid">
        {tiles.map((value, idx) => {
          const isEmpty = value === 0; // 0 is empty
          const className = `
            puzzle-cell 
            ${isEmpty ? 'empty' : ''} 
            ${idx === 0 ? 'top-left' : ''} 
            ${idx === 2 ? 'top-right' : ''} 
            ${idx === 6 ? 'bottom-left' : ''} 
            ${idx === 8 ? 'bottom-right' : ''}
          `.trim();

          return (
            <div
            key={idx}
            className={className}
            onClick={() => {
              const updatedTiles = handleTileClick(idx); // Get the updated tiles
        
              if (isSolved(updatedTiles)) {
                setWinMsg("SOLVED! after " + (moveCount + 1) + " moves!")
              } else {
                console.log("Not SOLVED!");
              }
            }}
          >
            {isEmpty ? '' : value}
          </div>
          );
        })}
      </div>
      <div className="count">Moves: {moveCount}</div>
      <div className="winMsg">{winMsg}</div>
    </div>
  );
};

export default App;
