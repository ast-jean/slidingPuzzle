package db

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"sync"

	_ "github.com/lib/pq" // PostgreSQL driver
)

var (
	db   *sql.DB
	once sync.Once
)

// InitDB initializes the database connection.
func InitDB(dsn string) {
	once.Do(func() {
		var err error
		db, err = sql.Open("postgres", dsn)
		if err != nil {
			log.Fatalf("Failed to connect to the database: %v", err)
		}

		// Verify connection
		if err := db.Ping(); err != nil {
			log.Fatalf("Failed to ping the database: %v", err)
		}

		log.Println("Database connected successfully!")
	})
}

// GetDB returns the database instance for use in queries.
func GetDB() *sql.DB {
	if db == nil {
		log.Fatal("Database not initialized. Call InitDB() first.")
	}
	return db
}

// CloseDB closes the database connection.
func CloseDB() {
	if db != nil {
		if err := db.Close(); err != nil {
			log.Printf("Error closing database: %v", err)
		} else {
			log.Println("Database connection closed.")
		}
	}
}

// SaveUserSolution saves a user's solution to the database.
func SaveUserSolution(moveCount int, gameStates [][]int) error {
	// Convert gameStates to JSON
	gameStatesJSON, err := json.Marshal(gameStates)
	if err != nil {
		return fmt.Errorf("failed to serialize game states: %w", err)
	}

	query := `
		INSERT INTO user_solutions (move_count, game_states)
		VALUES ($1, $2)
	`
	_, err = GetDB().Exec(query, moveCount, gameStatesJSON)
	if err != nil {
		return fmt.Errorf("failed to save user solution: %w", err)
	}
	log.Printf("User solution with %d moves saved successfully!", moveCount)
	return nil
}

// GetUserSolutions retrieves all user solutions from the database.
func GetUserSolutions() ([]struct {
	MoveCount  int
	GameStates [][]int
}, error) {
	query := `SELECT move_count, game_states FROM user_solutions`
	rows, err := GetDB().Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user solutions: %w", err)
	}
	defer rows.Close()

	var solutions []struct {
		MoveCount  int
		GameStates [][]int
	}
	for rows.Next() {
		var moveCount int
		var gameStatesJSON []byte
		if err := rows.Scan(&moveCount, &gameStatesJSON); err != nil {
			return nil, fmt.Errorf("failed to scan user solution row: %w", err)
		}

		var gameStates [][]int
		if err := json.Unmarshal(gameStatesJSON, &gameStates); err != nil {
			return nil, fmt.Errorf("failed to deserialize game states: %w", err)
		}

		solutions = append(solutions, struct {
			MoveCount  int
			GameStates [][]int
		}{
			MoveCount:  moveCount,
			GameStates: gameStates,
		})
	}
	return solutions, nil
}
