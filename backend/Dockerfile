FROM golang:1.23 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy Go modules manifests
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire backend source code
COPY . .

# Build the application binary
RUN go build -o /app/main ./server/main.go
RUN ls -R
RUN ls -R /app

# Step 2: Use a minimal runtime image
FROM gcr.io/distroless/static:nonroot

# Set the working directory for the runtime container
WORKDIR /

# Copy the built application binary from the builder
COPY --from=builder /app/server /server


# Expose the application port
EXPOSE 8510
# Set the command to run the application
CMD ["/server/main"]
