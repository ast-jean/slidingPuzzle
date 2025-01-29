package api

import "net/http"

func RegisterRoutes(mux *http.ServeMux) {
    // Example Health Check route
    mux.HandleFunc("/health", handleHealth)
    
    // Add other routes here:
    // mux.HandleFunc("/api/solve", handleSolve)
    // mux.HandleFunc("/api/learn", handleLearn)
}
