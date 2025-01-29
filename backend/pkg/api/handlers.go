package api

import (
    "log"
    "net/http"
)

// StartServer initializes a ServeMux, registers routes, and listens on port 8510.
func StartServer() error {
    mux := http.NewServeMux()
    RegisterRoutes(mux)

    log.Println("Server listening on :8510")
    return http.ListenAndServe(":8510", mux)
}

// handleHealth is a basic health-check endpoint.
func handleHealth(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("OK"))
}
