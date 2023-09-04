# Use the official Golang image as a parent image
FROM golang:1.21

# Set the working directory in the container
WORKDIR /app

# Copy go.mod and go.sum files to the working directory
COPY go.mod go.sum ./

# Download and install Go module dependencies
RUN go mod download

# Tidy up and remove any unused dependencies
RUN go mod tidy

# Copy the rest of the application code to the working directory
COPY . .

# Build the Go application
RUN go build -o main

# Expose port 8080 for incoming traffic
EXPOSE 8080

# Command to run the application
CMD ["./main"]
