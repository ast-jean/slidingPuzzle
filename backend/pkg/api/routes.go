package api

import (
    "net/http"
)

func RegisterRoutes(mux *http.ServeMux) {
    mux.HandleFunc("/api/gen", handleGenAI)       // Dynamic generation fetching
    mux.HandleFunc("/api/solve", handleSolve)     // Solve API
    mux.HandleFunc("/api/learn", handleLearn)     // Learn API
}
