FROM node:alpine

# Install serve globally
RUN npm install -g serve

# Copy built files from previous stage
COPY . /app

# Expose port 5000 to the outside world
EXPOSE 8080

# Command to serve the React app
CMD ["serve", "-s", "app", "-l", "8080"]

