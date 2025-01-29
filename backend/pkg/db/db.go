package db

import (
    "database/sql"
    "log"

    _ "github.com/lib/pq" // PostgreSQL driver
)

var DB *sql.DB

// InitDB opens a connection to the database and verifies it.
func InitDB(dsn string) {
    var err error
    DB, err = sql.Open("postgres", dsn)
    if err != nil {
        log.Fatalf("Failed to connect to DB: %v", err)
    }
    if err := DB.Ping(); err != nil {
        log.Fatalf("Failed to ping DB: %v", err)
    }
    log.Println("Database connected successfully!")
}

// CloseDB closes the database connection if open.
func CloseDB() {
    if DB != nil {
        if err := DB.Close(); err != nil {
            log.Printf("Error closing database: %v", err)
        } else {
            log.Println("Database connection closed.")
        }
    }
}
