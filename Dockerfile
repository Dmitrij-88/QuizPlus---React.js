# Use the official Node.js image as the base image
FROM node:lts-alpine3.19

# Set the working directory in the container
WORKDIR /CS363-Group1-Project

# Copy the content of your project into the container
COPY . .

# Change the working directory to the 'frontend' directory
WORKDIR /CS363-Group1-Project/frontend

# Install frontend dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]