FROM node:8.11.4

# Create project directory (workdir)
RUN mkdir /app
WORKDIR /app

# Add package.json to WORKDIR and install dependencies
COPY package.json .
RUN npm install

EXPOSE 8080

# Add the remaining source code files to WORKDIR
COPY . .

RUN npm install react-scripts -g

# Start nodemon for hot reloading (will watch for file changes and then rebuild & restart the application)
CMD ["npm", "start"]
