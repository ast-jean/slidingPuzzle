package main

import (
    "log"

    "github.com/astjean/aislidinggame-backend/pkg/api"
    "github.com/astjean/aislidinggame-backend/pkg/db"
)

// main initializes the DB connection and starts the HTTP server.
func main() {
    // Initialize the database connection.
    // Replace the DSN with your actual credentials and DB name.
    db.InitDB("postgresql://adam:6969@localhost:5432/dbname?sslmode=disable")

    // Ensure the DB is closed when the application exits.
    defer db.CloseDB()

    // Start the HTTP server.
    log.Fatal(api.StartServer())
}
