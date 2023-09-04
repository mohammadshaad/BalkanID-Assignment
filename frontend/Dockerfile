# Use an official Node.js runtime as a parent image for building
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application for production
RUN npm run build

# Use the official Nginx image as a parent image
FROM nginx:1.21

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the production-ready build files from the 'build' directory to the Nginx web server directory
COPY build/ /usr/share/nginx/html

# Expose port 80 for incoming traffic
EXPOSE 80

# The default command to start Nginx will work perfectly for serving your React app
CMD ["nginx", "-g", "daemon off;"]
