# Use the official Node.js image as base
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js image as the final base
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built React app from the previous stage
COPY --from=build /app/build ./build

# Expose the port the React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "run", "start"]
