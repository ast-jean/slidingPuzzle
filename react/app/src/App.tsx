import React, { useState, useEffect } from 'react';



const App: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [winMsg, setWinMsg] = useState<string>("");
  const [userMoves, setUserMoves] = useState<number[][]>([]);
  const [isSolvedBool, setIsSolved] = useState(false);
  const [enableGame, setEnableGame] = useState(false);
  const [isAiSolveEnabled, setAiSolveEnabled] = useState(false);
  const [isAiSearching, setAiSearching] = useState(false);

  const shuffleTiles = () => {
    const mixed = mixTiles();
    setTiles(mixed);
    setMoveCount(0);
    setEnableGame(true);
    setWinMsg('');
    setIsSolved(false);
    setUserMoves([mixed]);
    setAiSolveEnabled(true);

    console.log("Tiles:", mixed)
    console.log("Moves:"+ moveCount, mixed);
  };

  const addMove = (newTiles: number[]) => {
    setUserMoves((prevMoves) => [...prevMoves, newTiles]);
};

const handleFetchAiSolution = () => {
  fetchAiSolution(tiles); // Pass `tiles` as `tilesToSearch`
};

const fetchAiSolution = async (tilesToSearch: number[]): Promise<void> => {

  // Validate the input tilesToSearch
  if (!tilesToSearch || tilesToSearch.length !== 9) {
    console.error("Invalid tilesToSearch provided. It must be an array of 9 numbers.", tilesToSearch);
    return;
  }

  try {
    // Fetch AI solution from the backend
    setAiSearching(true);
    const response = await fetch("http://localhost:8080/ai-solution", {
      method: "POST",
      body: JSON.stringify({
        currentPuzzle: tilesToSearch.join(''), // Convert number[] to string e.g. "123456780"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data: number[][] = await response.json(); 
      // Assuming the response is an array of strings like ["123456708", "123456780"]
      // setAiMovesQueue(data);
      // aiMoveIndexRef.current = 0; // Reset AI move index
    } else {
      console.error("Failed to fetch AI solution:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching AI solution:", error);
    setAiSearching(false);
    //display error with UI
  }
};


//Debug Console prints
  useEffect(() => {
    console.log("Updated tiles:", tiles);
  }, [tiles]);

    useEffect(() => {
    console.log("Updated move count:", moveCount);
  }, [moveCount]);

  useEffect(() => {
    console.log("Updated user move:", userMoves);
  }, [userMoves]);

  // Parse the puzzle from the URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the '#' symbol
    if (hash) {

      let newTiles = hash.split('').map(Number)
      if (isSolvable(newTiles)) {
        const customTiles = hash.split('').map(Number);
        setTiles(customTiles);
        setMoveCount(0);
        setEnableGame(true);
        setWinMsg('');
        setIsSolved(false);
        setUserMoves([customTiles]);
        setAiSolveEnabled(true);
      } else {
        alert('Invalid puzzle in URL. Using default puzzle.');
      }
    } else {
      setTiles([1, 2, 3, 4, 5, 6, 7, 8, 0]); // Default puzzle
    }
  }, []);

///////////////////////

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
    if (
      (tiles[index - 3] === 0 && index - 3 >= 0) || // Move up
      (tiles[index + 3] === 0 && index + 3 < tiles.length) || // Move down
      (tiles[index - 1] === 0 && index % 3 !== 0) || // Move left
      (tiles[index + 1] === 0 && (index + 1) % 3 !== 0) // Move right
      ) {
          setAiSolveEnabled(false);
          if (tiles[index - 3] === 0 && index - 3 >= 0) {
            // Move up
            [newTiles[index], newTiles[index - 3]] = [newTiles[index - 3], newTiles[index]];
          } else if (tiles[index + 3] === 0 && index + 3 < tiles.length) {
            // Move down
            [newTiles[index], newTiles[index + 3]] = [newTiles[index + 3], newTiles[index]];
          } else if (tiles[index - 1] === 0 && index % 3 !== 0) {
            // Move left
            [newTiles[index], newTiles[index - 1]] = [newTiles[index - 1], newTiles[index]];
          } else if (tiles[index + 1] === 0 && (index + 1) % 3 !== 0) {
            // Move right
            [newTiles[index], newTiles[index + 1]] = [newTiles[index + 1], newTiles[index]];
          }
          setTiles(newTiles);
          setMoveCount((count) => count + 1);
          addMove(newTiles);
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
    setAiSolveEnabled(false);
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
      <div className='buttons'>
      <button className="btn" onClick={shuffleTiles}>Shuffle</button>
      <button className="btn" onClick={handleFetchAiSolution} disabled={!isAiSolveEnabled}>{`${!isAiSearching ? 'Show AI solve' : 'Brewing Solution...'}`}
      <div className={`${isAiSearching ? '' : 'hidden'}`}>
      <span className={`loader`}>
        <div className="loader-element"></div>
      </span>
      </div>
      </button>
      </div>
      <div className="puzzle-grid">
        {tiles.map((value, idx) => {
          const isEmpty = value === 0; // 0 is empty
          //Add a classname for rounded corners
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
