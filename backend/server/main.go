package main

import (
	"log"
	"net/http"
	"time"
	"../pkg/api"
	"../pkg/db"
)

func main() {
    // Initialize database connection
    db.InitDB()
    defer db.CloseDB()

    // Create HTTP server
    mux := http.NewServeMux()
    api.RegisterRoutes(mux) // Register API routes

    srv := &http.Server{
        Addr:              ":8510",
        Handler:           mux,
        ReadHeaderTimeout: 5 * time.Second,
    }

    log.Println("Server running on http://localhost:8510")
    log.Fatal(srv.ListenAndServe())
}