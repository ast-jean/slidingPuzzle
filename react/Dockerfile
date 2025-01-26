# 1) Build Stage
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy only the package.json and package-lock.json first to leverage Docker caching
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY app ./

# Build the React app
RUN npm run build

# 2) Production Stage
FROM nginx:alpine

# Copy the built files from the previous stage to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
