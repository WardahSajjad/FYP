# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Install Python 3 and other necessary dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Node.js application will run
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
